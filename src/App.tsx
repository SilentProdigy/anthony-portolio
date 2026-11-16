import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, CircleCheck, Code2,
  ExternalLink, Gauge, Globe2, Headphones, LayoutDashboard, Link2,
  Mail, Menu, MonitorSmartphone, MousePointerClick, Palette, Pause,
  Play, Send, ShoppingBag, Sparkles, Workflow, X, Megaphone,
  Wrench, CalendarDays, ShieldCheck, Users,
} from 'lucide-react';
import profilePhoto from './assets/img/anthony-portrait.jpg';
import fleetTrackr from './assets/img/fleetrackr-mobile-app.png';
import vouxrBanner from './assets/img/vouxr-banner.png';
import './landing.css';

const EMAIL = 'lopez.anthonymark16@gmail.com';

const services = [
  { name: 'GHL Specialist', short: 'GoHighLevel', icon: Workflow, subtitle: 'CRM & automation', description: 'CRM setup, pipelines, lead nurturing, workflow automation, funnels, forms, appointment systems, campaigns, and integrations.', featured: true },
  { name: 'Web Specialist', short: 'Web Specialist', icon: MonitorSmartphone, subtitle: 'Websites & web apps', description: 'Modern websites, WordPress, Shopify, high-converting landing pages, custom business applications, maintenance, and optimization.', featured: true },
  { name: 'Graphic Design', short: 'Graphic Design', icon: Palette, subtitle: 'Brand & creatives', description: 'Professional marketing graphics, social media creatives, advertising assets, promotional materials, and consistent brand visuals.' },
  { name: 'Social Media Management', short: 'Social Media', icon: Megaphone, subtitle: 'Content & growth', description: 'Content planning, branded posts, scheduling, campaign coordination, community engagement support, and performance reporting.' },
  { name: 'Technical Support', short: 'Tech Support', icon: Headphones, subtitle: 'Help & maintenance', description: 'Technical troubleshooting, website repairs, hosting and DNS support, platform configuration, integrations, and ongoing assistance.' },
];

const outcomes = [
  { title: 'More qualified leads', subtitle: 'Capture and nurture opportunities', icon: Users },
  { title: 'Smarter operations', subtitle: 'Reduce repetitive manual work', icon: Workflow },
  { title: 'Better digital experience', subtitle: 'Make your website work harder', icon: Globe2 },
  { title: 'Stronger brand presence', subtitle: 'Stand out with consistent visuals', icon: Palette },
  { title: 'Reliable ongoing support', subtitle: 'Keep everything running smoothly', icon: ShieldCheck },
];

const webServices = [
  { icon: Code2, name: 'Custom Web Development', text: 'Responsive websites and modern front-end experiences using React, Next.js, and clean code.' },
  { icon: Globe2, name: 'WordPress & WooCommerce', text: 'Custom WordPress sites, Elementor builds, plugin features, and online stores.' },
  { icon: ShoppingBag, name: 'Shopify Development', text: 'Theme and Liquid customization, product experiences, storefront improvements, and CRO.' },
  { icon: LayoutDashboard, name: 'Custom Web Apps & PWAs', text: 'Business dashboards, point-of-sale systems, loyalty apps, and workflow tools.' },
  { icon: MousePointerClick, name: 'Landing Pages & Funnels', text: 'Lead-generation pages, clear user journeys, conversion-focused layouts, and forms.' },
  { icon: Link2, name: 'Integrations & Automation', text: 'Connect services, workflows, APIs, webhooks, and back-office systems.' },
  { icon: Gauge, name: 'Performance & SEO', text: 'Speed improvements, technical SEO foundations, accessibility, and UX refinements.' },
  { icon: Wrench, name: 'Maintenance & Troubleshooting', text: 'Bug fixes, updates, platform migrations, domain setup, and technical upkeep.' },
];

const projects = [
  { label: 'CUSTOMER LOYALTY · WEB APP', title: 'Vouxr Rewards', description: 'Mobile-first loyalty experiences with membership accounts, points, stamp cards, and business workflows.', href: 'https://vouxr-ai.vercel.app/', image: vouxrBanner, alt: 'Vouxr rewards application preview' },
  { label: 'FLEET MANAGEMENT · PWA', title: 'FleeTracker', description: 'Rental-management application for managing vehicles, bookings, customers, and business records.', href: 'https://fleetrackr.vercel.app/', image: fleetTrackr, alt: 'FleeTracker mobile application preview' },
  { label: 'OPERATIONS · BUSINESS SYSTEM', title: 'Eagles-Wings POS', description: 'Multi-store point-of-sale system for sales, inventory, staff workflows, and operational reporting.', href: 'https://eagles-wings-pos.vercel.app/', image: null, alt: '' },
];

const faqs = [
  { question: 'Can I hire you for a single service?', answer: 'Yes. You can request one specific service or combine services depending on your goals. We can define a clear scope before starting.' },
  { question: 'Do you work with existing websites or GHL accounts?', answer: 'Yes. I can review your existing setup to identify improvements, troubleshoot issues, and plan development or maintenance work. Access and scope are agreed upon first.' },
  { question: 'Can you handle design and development together?', answer: 'Yes. I work across visual design and implementation, so projects can include both the user experience and the technical build.' },
  { question: 'What do projects typically cost?', answer: 'Pricing depends on complexity, deliverables, integrations, and the level of ongoing support. Share your requirements and I can propose a suitable scope.' },
  { question: 'Can we work together remotely?', answer: 'Yes. I support remote collaboration with clear milestones, progress updates, and handover documentation where appropriate.' },
];

const nav = [
  { href: '#services', title: 'Services' },
  { href: '#web', title: 'Web Solutions' },
  { href: '#work', title: 'Selected Work' },
  { href: '#process', title: 'Process' },
  { href: '#faq', title: 'FAQs' },
];

const pathIn = (y: number) => `M 180 ${y} C 262 ${y}, 257 252, 307 252`;
const pathOut = (y: number) => `M 493 252 C 544 252, 538 ${y}, 620 ${y}`;

function FlowDiagram({ paused }: { paused: boolean }) {
  return (
    <div className="flow-wrap">
      <div className="flow-label-row">
        <span>MY SPECIALTIES</span>
        <span>YOUR BUSINESS OUTCOMES</span>
      </div>
      <div className="flow-stage" aria-label="Five digital services connect through one partner to create stronger business outcomes">
        <svg className="flow-wires" viewBox="0 0 800 520" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="wire-in" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#36b7f6" />
              <stop offset="100%" stopColor="#5b56e8" />
            </linearGradient>
            <linearGradient id="wire-out" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#5b56e8" />
              <stop offset="100%" stopColor="#a361ef" />
            </linearGradient>
          </defs>
          {services.map((service, i) => {
            const d = pathIn(80 + i * 88);
            return (
              <g key={service.name}>
                <path d={d} className="wire-base" />
                <path d={d} className="wire-dash incoming" />
                {!paused && <circle className="flow-particle" r="4.2" fill="#46c6ff">
                  <animateMotion path={d} dur={`${4.1 + i * .35}s`} begin={`${i * -.4}s`} repeatCount="indefinite" />
                </circle>}
              </g>
            );
          })}
          {outcomes.map((outcome, i) => {
            const d = pathOut(80 + i * 88);
            return (
              <g key={outcome.title}>
                <path d={d} className="wire-base" />
                <path d={d} className="wire-dash outgoing" />
                {!paused && <circle className="flow-particle" r="4.2" fill="#9d66ff">
                  <animateMotion path={d} dur={`${4.3 + i * .35}s`} begin={`${i * -.38}s`} repeatCount="indefinite" />
                </circle>}
              </g>
            );
          })}
        </svg>
        <div className="flow-rail flow-left">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <a href="#services" className="flow-card" key={service.name} style={{ top: `${48 + i * 88}px` }}>
                <span className="flow-card-icon"><Icon size={19} aria-hidden="true" /></span>
                <span><strong>{service.short}</strong><small>{service.subtitle}</small></span>
              </a>
            );
          })}
        </div>
        <div className="flow-hub">
          <span className="hub-ring" />
          <img src={profilePhoto} alt="Anthony Mark Lopez" />
          <div className="hub-shade">
            <small>ONE DIGITAL PARTNER</small>
            <strong>Built around your growth.</strong>
          </div>
        </div>
        <div className="flow-rail flow-right">
          {outcomes.map((outcome, i) => {
            const Icon = outcome.icon;
            return (
              <div className="flow-card" key={outcome.title} style={{ top: `${48 + i * 88}px` }}>
                <span className="flow-card-icon result"><Icon size={19} aria-hidden="true" /></span>
                <span><strong>{outcome.title}</strong><small>{outcome.subtitle}</small></span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flow-mobile">
        <div className="flow-mobile-label">FIVE CONNECTED SERVICES</div>
        <div className="mobile-service-list">
          {services.map((service) => {
            const Icon = service.icon;
            return <span key={service.name}><Icon size={17} aria-hidden="true" />{service.short}</span>;
          })}
        </div>
        <div className="mobile-connector" aria-hidden="true"><span /></div>
        <div className="mobile-hub">
          <img src={profilePhoto} alt="Anthony Mark Lopez" />
          <div><small>YOUR DIGITAL PARTNER</small><strong>One partner. Multiple solutions.</strong></div>
        </div>
        <div className="mobile-connector" aria-hidden="true"><span /></div>
        <div className="mobile-outcomes">
          {outcomes.map((outcome) => <span key={outcome.title}><Check size={14} aria-hidden="true" />{outcome.title}</span>)}
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get('name') || '').trim();
    const email = String(values.get('email') || '').trim();
    const service = String(values.get('service') || '').trim();
    const company = String(values.get('company') || '').trim();
    const message = String(values.get('message') || '').trim();
    const subject = `Project consultation — ${service} — ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Business: ${company || 'Not provided'}`,
      `Service: ${service}`,
      '',
      'Project details:',
      message,
    ].join('\n');
    setStatus('Your email application should open with your inquiry ready to send. Please send the email to complete your request. Nothing has been submitted automatically.');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="form-head">
        <span className="form-head-icon"><Send size={19} aria-hidden="true" /></span>
        <div><h3>Tell me about your project</h3><p>Share a few details and let's start the conversation.</p></div>
      </div>
      <div className="form-grid">
        <label>Full name *<input name="name" autoComplete="name" required maxLength={100} placeholder="Your name" /></label>
        <label>Work email *<input type="email" name="email" autoComplete="email" required maxLength={160} placeholder="you@company.com" /></label>
        <label className="full">Business / website (optional)<input name="company" autoComplete="organization" maxLength={200} placeholder="Company name or website URL" /></label>
        <label className="full">What can I help with? *
          <select name="service" defaultValue="" required>
            <option value="" disabled>Choose a service</option>
            {services.map((service) => <option key={service.name} value={service.name}>{service.name}</option>)}
            <option>Multiple Services / Not Sure Yet</option>
          </select>
        </label>
        <label className="full">Project details *
          <textarea name="message" required minLength={10} maxLength={3000} rows={5} placeholder="What are you looking to build, improve, or solve?" />
        </label>
      </div>
      <button type="submit" className="button button-primary form-submit">Prepare My Inquiry <ArrowRight size={18} aria-hidden="true" /></button>
      <p className="form-disclosure">This opens your email application with a prepared message. No information is collected or stored by this website yet.</p>
      {status && <p className="form-status" role="status">{status}</p>}
      <p className="form-fallback">Email directly: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
    </form>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('motion-enabled');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
    return () => { observer.disconnect(); document.documentElement.classList.remove('motion-enabled'); };
  }, []);

  return (
    <div className={`site-shell ${motionPaused ? 'motion-paused' : ''}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label="Anthony Mark Lopez — Home" onClick={() => setMobileMenuOpen(false)}>
            <img src={profilePhoto} alt="" className="brand-avatar" />
            <span className="brand-copy"><strong>Anthony Mark Lopez</strong><small>Digital Solutions Specialist</small></span>
          </a>
          <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`} id="main-navigation" aria-label="Main navigation">
            {nav.map((item) => <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>{item.title}</a>)}
            <a className="nav-mobile-contact" href="#contact" onClick={() => setMobileMenuOpen(false)}>Discuss Your Project <ArrowUpRight size={16} /></a>
          </nav>
          <div className="header-actions">
            <a className="button button-primary nav-contact" href="#contact">Get a Free Consultation <ArrowUpRight size={17} aria-hidden="true" /></a>
            <button className="menu-button" type="button" aria-controls="main-navigation" aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileMenuOpen((previous) => !previous)}>
              {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><Sparkles size={15} aria-hidden="true" /> YOUR DIGITAL GROWTH PARTNER</span>
              <h1>Build better websites. <span>Automate smarter.</span> Grow with confidence.</h1>
              <p>One reliable partner for GoHighLevel, web development, graphic design, social media management, and technical support—focused on helping your business work better and grow.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">Get a Free Consultation <ArrowUpRight size={18} aria-hidden="true" /></a>
                <a className="button button-outline" href="#services">Explore Services <ArrowRight size={18} aria-hidden="true" /></a>
              </div>
              <div className="hero-assurances">
                <span><CircleCheck size={17} />Business-focused solutions</span>
                <span><CircleCheck size={17} />End-to-end support</span>
                <span><CircleCheck size={17} />Remote collaboration</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="flow-topline"><span>FROM SERVICES TO RESULTS</span><button type="button" aria-pressed={motionPaused} className="motion-toggle" onClick={() => setMotionPaused((value) => !value)}>{motionPaused ? <Play size={15} /> : <Pause size={15} />}{motionPaused ? 'Play motion' : 'Pause motion'}</button></div>
              <FlowDiagram paused={motionPaused} />
            </div>
          </div>
        </section>

        <section className="capability-strip" aria-label="Platforms and capabilities">
          <div className="container strip-inner">
            <span>TOOLS & PLATFORMS</span>
            <div className="strip-tools"><b>GoHighLevel</b><b>WordPress</b><b>Shopify</b><b>React / Next.js</b><b>Supabase</b><b>Canva / Adobe</b></div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-head reveal"><div><span className="section-kicker">01 / WHAT I DO</span><h2>Specialized digital services.<br /><span>One dependable partner.</span></h2></div><p>From your online presence to the systems supporting your business, get a practical mix of technical and creative expertise.</p></div>
            <div className="service-grid">
              {services.map((service) => {
                const Icon = service.icon;
                return <article className={`service-card reveal ${service.featured ? 'featured' : ''}`} key={service.name}>
                  <div className="service-top"><span className="service-icon"><Icon size={26} aria-hidden="true" /></span>{service.featured && <span className="featured-tag">CORE SERVICE</span>}</div>
                  <h3>{service.name}</h3><p>{service.description}</p>
                  <a href={service.name === 'Web Specialist' ? '#web' : '#contact'} className="inline-link">{service.name === 'Web Specialist' ? 'Explore web solutions' : 'Discuss this service'} <ArrowUpRight size={17} aria-hidden="true" /></a>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="web-section" id="web">
          <div className="container web-layout">
            <div className="web-intro reveal">
              <span className="section-kicker light">02 / WEB SPECIALIST</span>
              <h2>Your website should do more than <em>look good.</em></h2>
              <p>Whether you need an online storefront, a high-converting landing page, or a custom system built around your team, I handle the strategy, development, and technical details.</p>
              <a href="#contact" className="button button-white">Let's Talk Web Solutions <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
            <div className="web-services-grid">
              {webServices.map((service) => {
                const Icon = service.icon;
                return <article className="web-card reveal" key={service.name}><span className="web-card-icon"><Icon size={23} aria-hidden="true" /></span><h3>{service.name}</h3><p>{service.text}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="container">
            <div className="section-head reveal"><div><span className="section-kicker">03 / SELECTED WORK</span><h2>Built for real businesses.<br /><span>Designed for real workflows.</span></h2></div><p>A few practical examples of custom systems and digital experiences I've worked on.</p></div>
            <div className="work-grid">
              {projects.map((project) => (
                <article className="project-card reveal" key={project.title}>
                  {project.image ? <div className="project-media"><img src={project.image} alt={project.alt} loading="lazy" /></div> :
                    <div className="project-media project-pos" role="img" aria-label="Illustrative point-of-sale dashboard graphic">
                      <div className="pos-browser"><span className="pos-dots">● ● ●</span><div className="pos-header">Eagles-Wings <small>POS Overview</small></div><div className="pos-tiles"><i /><i /><i /></div><div className="pos-chart"><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
                    </div>}
                  <div className="project-content"><span className="project-category">{project.label}</span><h3>{project.title}</h3><p>{project.description}</p><a href={project.href} target="_blank" rel="noopener noreferrer" className="inline-link">Visit project <ExternalLink size={16} aria-hidden="true" /></a></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="container">
            <div className="section-head reveal"><div><span className="section-kicker">04 / HOW WE WORK</span><h2>Clear steps.<br /><span>Less friction.</span></h2></div><p>A straightforward process that starts with your business problem and ends with a practical deliverable.</p></div>
            <div className="process-grid">
              {[
                ['01', 'Discover', 'Share your goals, pain points, existing tools, and what success looks like.'],
                ['02', 'Plan', 'Define the solution, deliverables, timeline, and checkpoints before building.'],
                ['03', 'Build', 'Design, develop, integrate, and refine with clear communication.'],
                ['04', 'Launch & support', 'Test the outcome, hand over the work, and plan any continued support.'],
              ].map(([number, title, description]) => <article className="process-card reveal" key={number}><span className="process-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="process-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span></article>)}
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-grid">
            <div className="reveal"><span className="section-kicker">05 / COMMON QUESTIONS</span><h2>Answers before we get started.</h2><p>Everything you need to know about services, how we can work together, and what happens next.</p><a href="#contact" className="inline-link">Still have questions? Let's talk <ArrowUpRight size={17} aria-hidden="true" /></a></div>
            <div className="faq-items reveal">{faqs.map((faq, i) => <details key={faq.question} open={i === 0}><summary>{faq.question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy reveal">
              <span className="section-kicker light">06 / LET'S WORK TOGETHER</span>
              <h2>Have something in mind?<br /><span>Let's make it happen.</span></h2>
              <p>Tell me what you're trying to build, improve, or automate. We'll discuss the most practical next step for your business.</p>
              <div className="contact-steps"><span><Check size={17} /> Share your goals</span><span><Check size={17} /> Identify the right services</span><span><Check size={17} /> Define the next steps</span></div>
              <div className="contact-email"><Mail size={19} /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-inner"><a href="#top" className="footer-brand"><img src={profilePhoto} alt="" /> Anthony Mark Lopez</a><span>Digital solutions · Web · GHL · Design · Support</span><span>© {new Date().getFullYear()} All rights reserved.</span></div></footer>
      <a href="#contact" className="mobile-sticky-cta"><CalendarDays size={17} aria-hidden="true" /> Discuss Your Project <ArrowUpRight size={16} aria-hidden="true" /></a>
    </div>
  );
}
