# Anthony Mark Lopez — Digital Solutions Landing Page

React + TypeScript + Vite lead-generation website, under development on `feat/service-landing-page`. The production `main` branch remains unchanged.

## Solutions

The homepage includes a Solutions menu, animated interactive branching diagram, solution cards, expanded Web Specialist preview, selected work, process, FAQs, and an inquiry form. Each main solution now has its own growth-focused page:

- `/solutions/ghl-automation` — GoHighLevel CRM, lead capture, workflow automation, and pipeline growth.
- `/solutions/web-development` — web development, WordPress, Shopify, custom web apps/PWAs, CRO, and integrations.
- `/solutions/graphic-design` — brand consistency, marketing creatives, and campaign communication.
- `/solutions/social-media-management` — content strategy, community engagement, and measurable traffic/inquiries.
- `/solutions/technical-support` — website reliability, troubleshooting, hosting, integrations, and ongoing maintenance.

Each detail page includes business challenges, growth mechanisms, suggested KPIs (not guarantees), deliverables, workflow, FAQs, related solutions, and a relevant consultation CTA.

## Routing & SEO

Routes are selected by path in `src/main.tsx`, and Vercel rewrites deep links to `index.html`. No additional router dependency is required. The detail pages update the page title, description, and Open Graph tags client-side. **Note:** Client-side metadata updates are not equivalent to unique prerendered HTML for SEO/social crawlers; static prerendering or SSR should be added before a search-focused production launch.

## Automatic lead capture — Supabase + Resend

The homepage inquiry form sends a JSON POST request to `/api/leads`, a Vercel Node.js Function. It never opens an email app.

**Production dependencies that must be configured before testing successfully:**

1. Create or select a **dedicated Supabase project for this portfolio website**. Do not reuse an unrelated business app's database.
2. In that project's SQL Editor, review and run [`database/portfolio_leads_setup.sql`](database/portfolio_leads_setup.sql). This creates `public.portfolio_leads`, `public.portfolio_lead_rate_limits`, and an access-restricted `claim_portfolio_lead_slot` function.
3. In Resend, [verify a domain you own](https://resend.com/docs/dashboard/domains/introduction). A free public email domain is not valid as the **From** address. Your **To** notification address may be Gmail.
4. In the existing Vercel project, navigate to **Settings → Environment Variables** and set the following values for the **Preview** environment. Never paste keys into chat or commit them to GitHub:

   | Variable | Value |
   | --- | --- |
   | `SUPABASE_URL` | `https://<project-ref>.supabase.co` from Supabase Connect |
   | `SUPABASE_SECRET_KEY` | New server-only `sb_secret_...` key, not the publishable key |
   | `RESEND_API_KEY` | Resend API key with email sending permission |
   | `RESEND_FROM_EMAIL` | E.g. `Anthony Mark Lopez <hello@verified-domain.example>` (must use your own verified domain) |
   | `LEAD_NOTIFICATION_EMAIL` | Email inbox where you want notifications, including Gmail |
   | `LEAD_HASH_SALT` | Random server-only secret (at least 32 characters) for rate-limit fingerprint hashing |

5. Redeploy the development branch preview **after** creating environment variables.
6. Test the form with your own email address, then verify a new row in **Supabase Table Editor → portfolio_leads** and the notification + acknowledgment in **Resend Logs**.

**Security and reliability:** Only the Vercel serverless function uses the Supabase secret and Resend key. Public tables have RLS enabled and no anonymous access policies. The backend validates input, uses a hidden bot-trap field, enforces five attempts per IP hash per hour via an atomic database function, escapes HTML in emails, and marks email delivery status in the lead record. A saved lead remains in the database if Resend temporarily fails. Configure additional anti-bot protection (such as Turnstile), retention rules, and a privacy notice before public launch.

**Lead fields:** name, email, optional company, selected solution, project details, source path, consent to contact, record status, notification status, acknowledgment status, and submission timestamp.

**Important:** Nothing is connected to the user's Supabase or Resend accounts yet, and credentials have not been installed. Until the database schema and Preview environment variables are configured, the endpoint returns a friendly unavailable error instead of falsely indicating success. Don't set these environment variables on Production until the launch is approved.

## Run locally

```bash
npm ci
npm run dev
npm run lint
npm run build
```

Test the homepage plus all five direct `/solutions/*` URLs, including refresh, browser back/forward navigation, responsive navigation, form preselection, and reduced-motion behavior.

## Deployment safety

GitHub branch: `feat/service-landing-page`. Use preview deployments. Do not merge into `main` or change the live production domain until approved.
