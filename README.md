# Anthony Mark Lopez — Digital Services Landing Page

React + TypeScript + Vite landing page for Anthony Mark Lopez's digital services.

**Development branch:** `feat/service-landing-page` — the existing `main` portfolio remains unchanged.

## Services

- GoHighLevel specialist (CRM, workflows, campaigns, funnels, and integrations)
- Web specialist (custom development, WordPress, WooCommerce, Shopify, web apps/PWAs, CRO, SEO, and support)
- Graphic design
- Social media management
- Technical support

## Features

- Responsive personal-brand hero using a portrait avatar
- Animated service-to-outcome branching SVG (with pause control and reduced-motion support)
- Service cards, web sub-services, projects, process, and FAQ
- Accessible mobile navigation and consultation call-to-action
- Consultation form currently creates a pre-filled email via `mailto:`. **It does not silently submit, collect, or store leads.** Connect a secure backend/GHL CRM workflow before describing the form as automated.
- Real image assets for Vouxr and FleeTracker; Eagles-Wings POS has a clearly illustrative dashboard graphic

## Local development

```bash
npm ci
npm run dev
npm run lint
npm run build
```

## Deployment safety

Use Vercel preview deployments for `feat/service-landing-page`; do not merge into `main` or change the production branch until approved. Verify the Vercel project's production branch in settings before publishing any changes.
