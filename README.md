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

## Lead inquiries

The homepage form supports a `?solution=<slug>#contact` link that preselects the relevant solution. Submission currently creates a prefilled email via `mailto:`. **It does not submit, store, or forward lead data automatically**. Connect a secure backend and GHL workflow before advertising automated capture.

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
