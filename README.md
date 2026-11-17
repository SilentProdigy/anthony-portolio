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

## Automatic lead capture — Supabase + Resend (no paid domain required)

The homepage inquiry form sends a POST request to `/api/leads`, a Vercel Node.js Function. It never asks visitors to send an email manually. The submission is stored in Supabase first; notifications are an optional separate step.

### 1. Set up the portfolio Supabase project

Create a dedicated Supabase project for the portfolio. Review and run `database/portfolio_leads_setup.sql` in its SQL Editor. The script creates the private `public.portfolio_leads` table, the `public.portfolio_lead_rate_limits` table, and an access-restricted `claim_portfolio_lead_slot` function. Don't run this in an unrelated app database.

### 2. Choose an email mode

Set `RESEND_MODE` in your Vercel **Preview** environment.

| Mode | What happens | Domain needed? |
| --- | --- | --- |
| `off` | Leads are saved in Supabase. No email is sent. View submissions in Supabase Table Editor. | No |
| `testing` | Leads are saved in Supabase, and Resend attempts to notify **only the email address registered with your Resend account** using `onboarding@resend.dev`. No email goes to the visitor. | No |
| `verified` | Leads are saved; Resend attempts to email your chosen inbox and acknowledge the visitor. Requires a verified custom sending domain. | Yes |

Resend's shared test sender is for development only and is restricted to the account's own email address. It is **not a production email service**. If your Gmail is not the address registered in Resend, it cannot receive test-mode notifications. You can still use `off` and securely collect leads. You can switch to `verified` later without changing the database or form.

### 3. Set server-only Vercel environment variables

Open Vercel Project → Settings → Environment Variables. Use **Preview** only until launch is approved.

| Variable | Required for | Value |
| --- | --- | --- |
| `SUPABASE_URL` | all modes | `https://<project-ref>.supabase.co` |
| `SUPABASE_SECRET_KEY` | all modes | Server-only `sb_secret_...` key (never the public key) |
| `LEAD_HASH_SALT` | all modes | Random secret of at least 32 characters |
| `RESEND_MODE` | all modes | `off`, `testing`, or `verified` |
| `RESEND_API_KEY` | testing / verified | Resend sending API key |
| `LEAD_NOTIFICATION_EMAIL` | testing / verified | For `testing`, **exact email address registered in Resend**. For `verified`, your notification inbox |
| `RESEND_FROM_EMAIL` | verified only | Address on your verified domain |

All keys belong in Vercel's secret environment, **not in GitHub**. `RESEND_FROM_EMAIL` is intentionally ignored in testing mode. Redeploy the **development branch** after adding variables.

### 4. Verify end to end

Submit a test inquiry, check for a new row in **Supabase Table Editor → portfolio_leads**, and confirm the status. In `testing` mode, check the account email and Resend logs; acknowledgments are intentionally marked `skipped`. In `off` mode, both notification statuses are marked `skipped`. Do not assume that a completed request means email delivery was successful; check the recorded notification status.

**Security:** The Vercel server-only API validates input, requires consent, uses a hidden bot-trap, enforces rate limiting via an atomic Supabase function, and escapes outgoing email HTML. The tables have RLS enabled and no public read/write grants. Configure additional bot protection and a privacy/retention policy before public launch.

**Important:** These files set up the implementation; a dedicated Supabase project, database SQL, and Vercel credentials still need to be configured. Without the required Supabase variables, the endpoint returns a 503 error. No production deployment or domain changes have been made.

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
