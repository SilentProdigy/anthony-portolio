export type Solution = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  title: string;
  subtitle: string;
  promise: string;
  challenges: { title: string; text: string }[];
  benefits: { title: string; text: string; signal: string }[];
  deliverables: { title: string; text: string }[];
  workflow: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const solutions: Solution[] = [
  {
    slug: 'ghl-automation',
    name: 'GHL Specialist',
    shortName: 'GoHighLevel',
    category: 'CRM & Automation',
    title: 'Capture more opportunities. Follow up with confidence.',
    subtitle: 'Turn disconnected leads and repetitive tasks into a clear, connected sales process with GoHighLevel.',
    promise: 'Build a customer journey where inquiries are recorded, follow-ups are timely, and your team knows exactly what to do next.',
    challenges: [
      { title: 'Leads slip through the cracks', text: 'Website forms, messages, and inquiries live in different places, making it difficult to track every opportunity.' },
      { title: 'Follow-ups take too much time', text: 'Manual reminders, repetitive messages, and fragmented handoffs slow down your sales process.' },
      { title: 'Pipeline visibility is limited', text: 'Without consistent stages and reporting, it is hard to know where prospects get stuck.' }
    ],
    benefits: [
      { title: 'Respond with better consistency', text: 'Route new inquiries into a centralized CRM and establish appropriate, permission-based follow-up workflows.', signal: 'Track response time and unassigned inquiries' },
      { title: 'Turn leads into organized opportunities', text: 'Use defined pipeline stages and ownership so every prospect has a clear next action.', signal: 'Track stage movement and booked appointments' },
      { title: 'Reduce repetitive administrative work', text: 'Automate routine tagging, reminders, notifications, and data updates where it makes sense.', signal: 'Track tasks automated and time saved' },
      { title: 'Make smarter growth decisions', text: 'Give your team a clearer picture of where inquiries originate and how they progress.', signal: 'Review source attribution and funnel conversion' }
    ],
    deliverables: [
      { title: 'CRM & pipeline setup', text: 'Contact organization, custom fields, stages, and user roles.' },
      { title: 'Workflows & automation', text: 'Lead routing, follow-up sequences, task creation, and internal notifications.' },
      { title: 'Funnels, forms & calendars', text: 'Conversion paths that move inquiries into the right process.' },
      { title: 'Email & SMS configuration', text: 'Permission-conscious campaigns, templates, and delivery setup.' },
      { title: 'Integrations & data flow', text: 'Connect supported tools such as Shopify, Zapier, and lead sources.' },
      { title: 'Testing & documentation', text: 'Validate triggers, contact records, and handoffs before launch.' }
    ],
    workflow: [
      { title: 'Audit', text: 'Review your lead sources, GHL account structure, and current bottlenecks.' },
      { title: 'Map', text: 'Define pipeline stages, contact ownership, and approved communications.' },
      { title: 'Build', text: 'Configure automations, assets, and integrations in a controlled sequence.' },
      { title: 'Validate', text: 'Test with sample contacts and document maintenance and reporting.' }
    ],
    faqs: [
      { question: 'Can you improve an existing GHL setup?', answer: 'Yes. The project can focus on cleaning up workflows, contact routing, pipelines, automations, and integrations rather than rebuilding everything.' },
      { question: 'Will automated messages be sent without testing?', answer: 'No. We can test triggers and message paths before enabling live communications, and check consent and sending settings first.' }
    ]
  },
  {
    slug: 'web-development',
    name: 'Web Specialist',
    shortName: 'Web Solutions',
    category: 'Websites & Applications',
    title: 'Build a website that supports real business growth.',
    subtitle: 'From lead-generation websites to Shopify stores and custom applications, make every digital touchpoint clearer, faster, and more useful.',
    promise: 'Your website should make it easy to understand your offer, trust your brand, and take the next step—not merely look good.',
    challenges: [
      { title: 'Visitors leave without taking action', text: 'Unclear messages, weak calls to action, and complicated forms can interrupt promising visits.' },
      { title: 'The site is hard to maintain', text: 'Slow pages, brittle templates, or plugin conflicts make simple improvements costly.' },
      { title: 'Tools are disconnected', text: 'Orders, forms, customer records, or internal processes require repeated manual work.' }
    ],
    benefits: [
      { title: 'Convert more relevant visits into inquiries', text: 'Shape clear service pages, persuasive calls to action, and forms around what customers are trying to accomplish.', signal: 'Measure inquiry and booking conversion' },
      { title: 'Create a smoother buying experience', text: 'Improve mobile layouts, product presentation, speed, and checkout journeys where supported.', signal: 'Monitor add-to-cart and checkout progression' },
      { title: 'Improve discoverability and usability', text: 'Strengthen technical SEO foundations, accessibility, content structure, and page performance.', signal: 'Review search visibility and Core Web Vitals' },
      { title: 'Support scalable operations', text: 'Build custom dashboards, PWAs, and integrations that bring business workflows into one place.', signal: 'Track workflow completion and manual steps reduced' }
    ],
    deliverables: [
      { title: 'Web Development', text: 'Responsive business sites and custom frontends with React or Next.js.' },
      { title: 'WordPress & WooCommerce', text: 'Content sites, Elementor builds, custom features, and e-commerce functionality.' },
      { title: 'Shopify Development', text: 'Theme/Liquid customization, product page UX, cart improvements, and CRO.' },
      { title: 'Custom Web Apps & PWAs', text: 'Business dashboards, POS, loyalty programs, and internal tools.' },
      { title: 'Landing Pages & Funnels', text: 'Focused campaign pages, lead forms, and conversion journeys.' },
      { title: 'Integrations & Automation', text: 'APIs, webhooks, CRM connections, and business-system data flow.' },
      { title: 'Performance & SEO', text: 'Mobile speed, metadata, accessibility, and technical optimization.' },
      { title: 'Maintenance & Troubleshooting', text: 'Fixes, updates, migrations, hosting, and ongoing technical care.' }
    ],
    workflow: [
      { title: 'Discover', text: 'Map the audience, website goals, required features, and existing technical constraints.' },
      { title: 'Design', text: 'Plan content hierarchy, mobile journeys, components, and conversion opportunities.' },
      { title: 'Develop', text: 'Implement, integrate, and test features using a maintainable approach.' },
      { title: 'Launch & improve', text: 'Validate forms and analytics, publish safely, and prioritize post-launch changes.' }
    ],
    faqs: [
      { question: 'Can you work with my existing WordPress or Shopify store?', answer: 'Yes. Work can cover redesigns, optimization, theme development, troubleshooting, or targeted new functionality.' },
      { question: 'Do I need a custom web app or a normal website?', answer: 'That depends on your workflows. A clear marketing site may be enough; custom applications are useful when unique operational features or integrations are required.' }
    ]
  },
  {
    slug: 'graphic-design',
    name: 'Graphic Design',
    shortName: 'Graphic Design',
    category: 'Brand & Creative',
    title: 'Make your brand easier to recognize, trust, and choose.',
    subtitle: 'Purposeful visual communication for social media, promotions, campaigns, and branded marketing materials.',
    promise: 'Consistent, well-designed creatives help people understand your offer quickly and recognize your business across channels.',
    challenges: [
      { title: 'The brand looks inconsistent', text: 'Every post or campaign feels different, making it harder to build recognition.' },
      { title: 'The offer gets overlooked', text: 'Busy layouts and weak visual hierarchy can hide the message you want customers to act on.' },
      { title: 'Creative production is a bottleneck', text: 'Without reusable templates and a simple process, promotions take longer to launch.' }
    ],
    benefits: [
      { title: 'Build a recognizable identity', text: 'Apply consistent colors, typography, and creative rules across your business touchpoints.', signal: 'Review brand consistency across channels' },
      { title: 'Communicate offers clearly', text: 'Prioritize the right message, product, and CTA in campaign graphics.', signal: 'Compare engagement and click-through by creative' },
      { title: 'Support marketing campaigns', text: 'Create formats suited to social posts, advertising placements, email banners, and promotions.', signal: 'Track production lead time and campaign readiness' },
      { title: 'Increase confidence in your business', text: 'Present a cohesive professional identity that makes your business feel considered and dependable.', signal: 'Gather customer and team feedback on clarity' }
    ],
    deliverables: [
      { title: 'Social media creatives', text: 'Consistent, platform-ready images and campaign assets.' },
      { title: 'Promotional posters', text: 'Product launches, offers, events, menus, and announcement visuals.' },
      { title: 'Digital advertising graphics', text: 'Visual variations with clear messages and calls to action.' },
      { title: 'Brand assets', text: 'Supporting visual identity elements and reusable templates.' },
      { title: 'Website graphics', text: 'Hero banners, service visuals, icons, and on-brand sections.' },
      { title: 'Creative handover', text: 'Organized exports, sizes, and editable formats where agreed.' }
    ],
    workflow: [
      { title: 'Brief', text: 'Define the audience, offer, brand standards, and placement.' },
      { title: 'Concept', text: 'Choose a creative direction and information hierarchy.' },
      { title: 'Refine', text: 'Review drafts and make agreed revisions.' },
      { title: 'Deliver', text: 'Provide production-ready assets and relevant usage guidance.' }
    ],
    faqs: [
      { question: 'Can you use my existing brand guidelines?', answer: 'Yes. Existing colors, typography, logos, and campaign references can guide each design.' },
      { question: 'Do you create graphics for social and website use?', answer: 'Yes. Deliverables can cover social posts, ad formats, website banners, and other digital marketing placements.' }
    ]
  },
  {
    slug: 'social-media-management',
    name: 'Social Media Management',
    shortName: 'Social Media',
    category: 'Content & Community',
    title: 'Turn consistent content into stronger customer relationships.',
    subtitle: 'Plan, create, coordinate, and improve social media content around your business goals—not just a posting schedule.',
    promise: 'A focused social presence keeps your brand visible, makes your offers easier to discover, and gives prospects a reason to engage.',
    challenges: [
      { title: 'Posting is inconsistent', text: 'Important offers and updates get missed when content has no clear calendar or owner.' },
      { title: 'Content lacks direction', text: 'Posts may look active without helping customers learn, trust, or contact the business.' },
      { title: 'Results are hard to interpret', text: 'Without simple reporting, teams struggle to distinguish attention from meaningful inquiries.' }
    ],
    benefits: [
      { title: 'Stay visible to the right audience', text: 'Create a practical content cadence tied to customer needs, seasonal activity, and offers.', signal: 'Monitor publishing consistency and reach' },
      { title: 'Build engagement and familiarity', text: 'Use useful, recognizable content that supports ongoing community interaction.', signal: 'Review saves, shares, comments, and profile visits' },
      { title: 'Guide audiences toward action', text: 'Connect posts to relevant pages, promotions, offers, or a clear inquiry path.', signal: 'Track clicks, inquiries, and campaign referrals' },
      { title: 'Improve content decisions', text: 'Review performance and adjust creative topics and formats over time.', signal: 'Compare content themes and engagement quality' }
    ],
    deliverables: [
      { title: 'Content strategy', text: 'Audience, goals, messaging pillars, and campaign topics.' },
      { title: 'Content calendar', text: 'Planned posts, recurring themes, and priority dates.' },
      { title: 'Creative coordination', text: 'Graphics, captions, hooks, and approved publishing assets.' },
      { title: 'Scheduling & publishing', text: 'Consistent release of reviewed and approved content.' },
      { title: 'Engagement support', text: 'Defined processes for comments, questions, and escalation.' },
      { title: 'Performance review', text: 'Clear summaries and actionable content recommendations.' }
    ],
    workflow: [
      { title: 'Assess', text: 'Review channels, audience, brand voice, and current performance.' },
      { title: 'Plan', text: 'Agree on calendar, goals, content themes, and review cadence.' },
      { title: 'Produce', text: 'Prepare content and coordinate revisions and approvals.' },
      { title: 'Publish & learn', text: 'Schedule approved posts and analyze useful signals.' }
    ],
    faqs: [
      { question: 'Can you work with our existing social media team?', answer: 'Yes. I can support content calendars, visual production, scheduling, or reporting as a clearly defined part of your workflow.' },
      { question: 'Do you promise follower or sales numbers?', answer: 'No. Results depend on your audience, offer, channel, and consistency. I focus on useful content execution and measurable signals.' }
    ]
  },
  {
    slug: 'technical-support',
    name: 'Technical Support',
    shortName: 'Tech Support',
    category: 'Reliability & Operations',
    title: 'Spend less time troubleshooting. More time serving customers.',
    subtitle: 'Reliable technical support for the websites, hosting, tools, and integrations your business depends on.',
    promise: 'Keep critical digital touchpoints dependable, reduce avoidable interruptions, and get clearer guidance when issues appear.',
    challenges: [
      { title: 'Small issues interrupt business', text: 'Broken forms, unexpected errors, and slow pages can prevent customers from taking action.' },
      { title: 'Tools and access are confusing', text: 'Domains, DNS, hosting, plugins, and connected platforms are often managed without clear documentation.' },
      { title: 'Fixes happen without a plan', text: 'Repeated patches and unclear responsibility can create additional maintenance risk.' }
    ],
    benefits: [
      { title: 'Protect customer-facing experiences', text: 'Troubleshoot site errors, contact forms, and important customer journeys.', signal: 'Track critical form checks and reported incidents' },
      { title: 'Reduce avoidable downtime', text: 'Improve maintenance habits, backups, and issue response where supported.', signal: 'Review incident frequency and restoration time' },
      { title: 'Keep systems better organized', text: 'Document configurations, account ownership, integrations, and updates.', signal: 'Audit access and configuration records' },
      { title: 'Make future improvements safer', text: 'Use staging, backups, and controlled releases for technical changes.', signal: 'Track tested changes and recurring issues' }
    ],
    deliverables: [
      { title: 'Website troubleshooting', text: 'Fix layout, functionality, form, and front-end issues.' },
      { title: 'Hosting & DNS support', text: 'Domain settings, SSL issues, deployments, and configuration assistance.' },
      { title: 'Platform setup', text: 'WordPress, Shopify, GHL, and supported business tools.' },
      { title: 'Integrations & debugging', text: 'Diagnose API, webhook, and connection issues.' },
      { title: 'Maintenance routines', text: 'Updates, backups, regression checks, and technical housekeeping.' },
      { title: 'Technical documentation', text: 'Change notes, issue handover, and setup guidance.' }
    ],
    workflow: [
      { title: 'Triage', text: 'Determine impact, reproduction steps, and immediate priorities.' },
      { title: 'Investigate', text: 'Review logs, settings, dependencies, and likely causes.' },
      { title: 'Resolve', text: 'Apply controlled fixes and test affected workflows.' },
      { title: 'Prevent', text: 'Document the issue and recommend practical safeguards.' }
    ],
    faqs: [
      { question: 'Can you help with a website you did not build?', answer: 'Yes. I can assess existing platforms, hosting, configurations, and third-party integrations before proposing changes.' },
      { question: 'Do you offer ongoing assistance?', answer: 'Ongoing support can be scoped around expected response needs, maintenance priorities, and the tools involved.' }
    ]
  }
];

export function solutionHref(slug: string) { return `/solutions/${slug}`; }
export function getSolution(slug: string) { return solutions.find(solution => solution.slug === slug); }
