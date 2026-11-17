import { createHash } from 'node:crypto';

// Vercel Node.js Function. Runs only on the server: never import into src/.
// The current Supabase sb_secret_* key belongs in SUPABASE_SECRET_KEY.
const ALLOWED_SOLUTIONS = new Set([
  'GHL Specialist', 'Web Specialist', 'Graphic Design',
  'Social Media Management', 'Technical Support',
  'Multiple Services / Not Sure Yet',
]);

type LeadPayload = {
  name: string;
  email: string;
  company: string | null;
  solution: string;
  message: string;
  source_path: string;
  consent_to_contact: true;
};

function response(body: Record<string, unknown>, status: number) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function escaped(value: string) {
  return value.replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char] as string));
}

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max + 1) : '';
}

function validate(raw: unknown): { lead?: LeadPayload; error?: string; honeypot?: boolean } {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { error: 'Invalid form data.' };
  const input = raw as Record<string, unknown>;
  if (clean(input.website, 200)) return { honeypot: true };
  const name = clean(input.name, 100);
  const email = clean(input.email, 160).toLowerCase();
  const company = clean(input.company, 200);
  const solution = clean(input.solution, 70);
  const message = clean(input.message, 3000);
  const source_path = clean(input.source_path, 350) || '/';
  if (name.length < 2 || name.length > 100 || /[\r\n]/.test(name)) return { error: 'Please enter a valid name.' };
  if (email.length < 5 || email.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Please enter a valid email address.' };
  if (company.length > 200) return { error: 'Company or website is too long.' };
  if (!ALLOWED_SOLUTIONS.has(solution)) return { error: 'Please choose a solution.' };
  if (message.length < 10 || message.length > 3000) return { error: 'Project details should be 10–3000 characters.' };
  if (input.consent !== true) return { error: 'Please confirm you agree to be contacted about this inquiry.' };
  if (source_path.length > 350 || !source_path.startsWith('/') || source_path.startsWith('//')) return { error: 'Invalid source page.' };
  return { lead: { name, email, company: company || null, solution, message, source_path, consent_to_contact: true } };
}

function serviceHeaders() {
  return {
    apikey: process.env.SUPABASE_SECRET_KEY as string,
    'Content-Type': 'application/json',
  };
}

async function dbRequest(endpoint: string, method: string, body: unknown, prefer?: string) {
  const root = new URL(process.env.SUPABASE_URL as string);
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(root.origin)) throw Error('Invalid Supabase URL');
  const headers: Record<string, string> = serviceHeaders();
  if (prefer) headers.Prefer = prefer;
  return fetch(root.origin + '/rest/v1/' + endpoint, {
    method, headers, body: JSON.stringify(body), signal: AbortSignal.timeout(9000),
  });
}

async function sendEmail(payload: Record<string, unknown>, idempotencyKey: string) {
  const result = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(9000),
  });
  if (!result.ok) {
    console.error('Resend request failed, status:', result.status);
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  // Email is optional: leads must still be saved when the owner has no verified domain.
  // 'testing' only sends to the email address registered with the Resend account.
  const emailMode = (process.env.RESEND_MODE || 'off').toLowerCase();
  if (!['off', 'testing', 'verified'].includes(emailMode)) {
    console.error('Invalid RESEND_MODE configuration.');
    return response({ error: 'Inquiry submission is temporarily unavailable. Please try again later.' }, 503);
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY || !process.env.LEAD_HASH_SALT ||
      process.env.LEAD_HASH_SALT.length < 32) {
    console.error('Lead capture is missing required Supabase configuration.');
    return response({ error: 'Inquiry submission is temporarily unavailable. Please try again later.' }, 503);
  }
  if (emailMode !== 'off' && (!process.env.RESEND_API_KEY || !process.env.LEAD_NOTIFICATION_EMAIL ||
      (emailMode === 'verified' && !process.env.RESEND_FROM_EMAIL))) {
    console.error('Resend is enabled but email settings are incomplete.');
    return response({ error: 'Inquiry submission is temporarily unavailable. Please try again later.' }, 503);
  }

  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) return response({ error: 'Invalid request origin.' }, 403);
    } catch {
      return response({ error: 'Invalid request origin.' }, 403);
    }
  }

  if (!(request.headers.get('content-type') || '').includes('application/json')) {
    return response({ error: 'Please submit the form as JSON.' }, 415);
  }
  if (Number(request.headers.get('content-length') || 0) > 12000) {
    return response({ error: 'Your message is too large.' }, 413);
  }

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > 12000) return response({ error: 'Your message is too large.' }, 413);
    raw = JSON.parse(text);
  } catch {
    return response({ error: 'Invalid submission data.' }, 400);
  }

  const parsed = validate(raw);
  if (parsed.honeypot) return response({ ok: true, message: 'Inquiry received.' }, 200);
  if (!parsed.lead) return response({ error: parsed.error || 'Invalid submission.' }, 400);
  const lead = parsed.lead;

  // The original IP is not written to the database. Only a salted digest is used for rate limiting.
  const ip = (request.headers.get('x-vercel-forwarded-for') ||
    request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  const fingerprint = createHash('sha256')
    .update(`${process.env.LEAD_HASH_SALT}:${ip}`).digest('hex');

  try {
    const claim = await dbRequest('rpc/claim_portfolio_lead_slot', 'POST', {
      p_fingerprint: fingerprint, p_limit: 5,
    });
    if (!claim.ok) {
      console.error('Supabase rate-limit RPC failed, status:', claim.status);
      return response({ error: 'Unable to process the inquiry. Please try again later.' }, 503);
    }
    if ((await claim.json()) !== true) {
      return response({ error: 'Too many inquiries from this connection. Please try again in an hour.' }, 429);
    }

    const inserted = await dbRequest('portfolio_leads?select=id', 'POST', lead, 'return=representation');
    if (!inserted.ok) {
      console.error('Supabase lead insert failed, status:', inserted.status);
      return response({ error: 'Unable to save the inquiry. Please try again later.' }, 503);
    }
    const rows = await inserted.json() as { id?: string }[];
    const id = rows[0]?.id;
    if (!id) throw Error('Supabase insert returned no lead id');

    const safeName = escaped(lead.name);
    const safeEmail = escaped(lead.email);
    const safeMessage = escaped(lead.message).replace(/\n/g, '<br>');
    const safeCompany = escaped(lead.company || 'Not supplied');
    const safeSolution = escaped(lead.solution);
    const safeSource = escaped(lead.source_path);
    const sender = emailMode === 'testing' ? 'onboarding@resend.dev' : (process.env.RESEND_FROM_EMAIL as string);
    const recipient = process.env.LEAD_NOTIFICATION_EMAIL as string;
    const base = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1c2b4a;line-height:1.65">`;

    const [notify, acknowledge] = await Promise.allSettled([
      emailMode === 'off' ? Promise.resolve(null) : sendEmail({
        from: sender,
        to: [recipient],
        ...(emailMode === 'verified' ? { reply_to: lead.email } : {}),
        subject: `New website inquiry: ${lead.solution}`,
        html: `${base}<h2>New consultation inquiry</h2><p><b>Name:</b> ${safeName}<br><b>Email:</b> ${safeEmail}<br><b>Company / website:</b> ${safeCompany}<br><b>Solution:</b> ${safeSolution}<br><b>Source:</b> ${safeSource}</p><h3>Project details</h3><p>${safeMessage}</p><p>Lead reference: ${escaped(id)}</p></body></html>`,
        text: `New website inquiry\nName: ${lead.name}\nEmail: ${lead.email}\nCompany: ${lead.company || 'Not supplied'}\nSolution: ${lead.solution}\nSource: ${lead.source_path}\n\n${lead.message}\n\nLead ID: ${id}`,
      }, `portfolio-lead-${id}-notify`),
      emailMode === 'verified' ? sendEmail({
        from: sender,
        to: [lead.email],
        reply_to: recipient,
        subject: 'Thanks for your inquiry — Anthony Mark Lopez',
        html: `${base}<p>Hi ${safeName},</p><p>Thanks for reaching out about <strong>${safeSolution}</strong>. I've received your project details and will review them.</p><p>I'll reply to this email when I have an update.</p><p>Best,<br>Anthony Mark Lopez</p></body></html>`,
        text: `Hi ${lead.name},\n\nThanks for reaching out about ${lead.solution}. I've received your project details and will review them.\n\nBest,\nAnthony Mark Lopez`,
      }, `portfolio-lead-${id}-ack`) : Promise.resolve(null),
    ]);

    const notificationStatus = emailMode === 'off' ? 'skipped' :
      notify.status === 'fulfilled' && notify.value ? 'sent' : 'failed';
    const acknowledgementStatus = emailMode !== 'verified' ? 'skipped' :
      acknowledge.status === 'fulfilled' && acknowledge.value ? 'sent' : 'failed';

    // Lead remains saved even if an email provider is temporarily unavailable.
    try {
      const updated = await dbRequest(`portfolio_leads?id=eq.${encodeURIComponent(id)}`, 'PATCH', {
        notification_status: notificationStatus,
        acknowledgement_status: acknowledgementStatus,
      }, 'return=minimal');
      if (!updated.ok) console.error('Failed to update lead notification status:', updated.status);
    } catch {
      console.error('Failed to update lead notification status.');
    }

    if (notificationStatus === 'failed' || acknowledgementStatus === 'failed') {
      console.error('Lead saved; one or more Resend notifications failed. Lead ID:', id);
    }
    return response({ ok: true, message: 'Thanks! Your inquiry was submitted successfully.', reference: id }, 201);
  } catch (error) {
    console.error('Lead capture request failed:', error instanceof Error ? error.message : 'Unknown error');
    return response({ error: 'The inquiry could not be completed. Please try again later.' }, 503);
  }
}
