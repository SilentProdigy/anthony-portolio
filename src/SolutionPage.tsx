import { useEffect, useState } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Check, ChevronDown, CircleCheck,
  ClipboardList, Code2, Headphones, Mail, Menu, Megaphone, Palette, ShieldCheck,
  Sparkles, Target, Workflow, X,
} from 'lucide-react';
import profilePhoto from './assets/img/anthony-portrait.webp';
import { getSolution, solutions, solutionHref, type Solution } from './solutionContent';
import './landing.css';
import './solutions.css';

const icons = {
  'ghl-automation': Workflow,
  'web-development': Code2,
  'graphic-design': Palette,
  'social-media-management': Megaphone,
  'technical-support': Headphones,
};

const slug = window.location.pathname.split('/').filter(Boolean)[1] ?? '';
const currentSolution = getSolution(slug);
const contactHref = (s: Solution) => `/?solution=${encodeURIComponent(s.slug)}#contact`;

function SolutionHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <div className="container header-inner">
      <a href="/" className="brand" aria-label="Anthony Mark Lopez — Home">
        <img src={profilePhoto} alt="" className="brand-avatar" />
        <span className="brand-copy"><strong>Anthony Mark Lopez</strong><small>Digital Solutions Specialist</small></span>
      </a>
      <nav className={`main-nav ${menuOpen ? 'open' : ''}`} id="solution-navigation" aria-label="Main navigation">
        <details className="solutions-nav-menu">
          <summary>Solutions <ChevronDown size={15} aria-hidden="true" /></summary>
          <div className="solutions-nav-panel">
            <a href="/#solutions" onClick={() => setMenuOpen(false)}>View all solutions</a>
            {solutions.map(s=><a key={s.slug} href={solutionHref(s.slug)} onClick={() => setMenuOpen(false)} aria-current={currentSolution?.slug===s.slug?'page':undefined}>{s.name}</a>)}
          </div>
        </details>
        <a href="/#work">Selected Work</a>
        <a href="/#process">Process</a>
        <a href="/#faq">FAQs</a>
        <a className="nav-mobile-contact" href={currentSolution ? contactHref(currentSolution) : '/#contact'}>Discuss Your Project <ArrowUpRight size={16} /></a>
      </nav>
      <div className="header-actions">
        <a className="button button-primary nav-contact" href={currentSolution ? contactHref(currentSolution) : '/#contact'}>Get a Free Consultation <ArrowUpRight size={17} aria-hidden="true"/></a>
        <button type="button" className="menu-button" aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen} aria-controls="solution-navigation" onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?<X size={25}/>:<Menu size={25}/>}</button>
      </div>
    </div>
  </header>;
}

function GrowthDiagram({solution}:{solution:Solution}) {
  const Icon=icons[solution.slug as keyof typeof icons];
  return <div className="solution-growth-diagram" aria-label="How the solution supports business growth">
    <div className="solution-graphic-header"><span className="solution-graphic-icon"><Icon size={23} /></span><div><small>YOUR GROWTH FRAMEWORK</small><strong>{solution.category}</strong></div></div>
    <div className="solution-graphic-stage">
      <div className="solution-graphic-card"><span>01 / THE CHALLENGE</span><strong>{solution.challenges[0].title}</strong></div>
      <div className="solution-graphic-connector" aria-hidden="true"><span/></div>
      <div className="solution-graphic-center"><Sparkles size={19}/><strong>Focused digital solution</strong></div>
      <div className="solution-graphic-connector" aria-hidden="true"><span/></div>
      <div className="solution-graphic-card success"><span>02 / GROWTH OPPORTUNITY</span><strong>{solution.benefits[0].title}</strong></div>
    </div>
    <div className="solution-graphic-footer"><CircleCheck size={16}/><span>Designed around your goals, audience, and existing tools</span></div>
  </div>;
}

function SolutionSections({solution}:{solution:Solution}) {
  const Icon=icons[solution.slug as keyof typeof icons];
  const related=solutions.filter(s=>s.slug!==solution.slug).slice(0,3);
  return <main id="main-content">
    <section className="solution-hero">
      <div className="container">
        <nav className="solution-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/#solutions">Solutions</a><span>/</span><span aria-current="page">{solution.name}</span></nav>
        <div className="solution-hero-grid">
          <div className="solution-hero-copy">
            <span className="solution-eyebrow"><Icon size={16}/>{solution.category.toUpperCase()} SOLUTION</span>
            <h1>{solution.title}</h1>
            <p className="solution-hero-subtitle">{solution.subtitle}</p>
            <div className="solution-hero-actions">
              <a href={contactHref(solution)} className="button button-primary">Let's Discuss This Solution <ArrowUpRight size={18} aria-hidden="true"/></a>
              <a href="#growth" className="button button-outline">How It Supports Growth <ArrowRight size={18} aria-hidden="true"/></a>
            </div>
            <div className="solution-assurance"><Check size={16}/><span>Strategy-first</span><Check size={16}/><span>Clear deliverables</span><Check size={16}/><span>Built for your business</span></div>
          </div>
          <GrowthDiagram solution={solution}/>
        </div>
      </div>
    </section>

    <section className="section solution-challenges">
      <div className="container">
        <div className="solution-section-heading"><span className="section-kicker">THE PROBLEM</span><h2>Does any of this sound familiar?</h2><p>Growth gets harder when your digital systems are working against you.</p></div>
        <div className="solution-challenge-grid">{solution.challenges.map((item,i)=><article className="solution-challenge-card" key={item.title}><span className="solution-item-number">0{i+1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div>
    </section>

    <section className="section solution-benefits" id="growth">
      <div className="container">
        <div className="solution-section-heading"><span className="section-kicker">HOW IT DRIVES GROWTH</span><h2>Turn everyday friction into measurable progress.</h2><p>{solution.promise}</p></div>
        <div className="solution-benefit-grid">{solution.benefits.map((benefit,i)=><article className="solution-benefit-card" key={benefit.title}>
          <span className="solution-benefit-icon">{i===0?<Target size={23}/>:i===1?<ArrowUpRight size={23}/>:i===2?<Workflow size={23}/>:<BarChart3 size={23}/>}</span>
          <h3>{benefit.title}</h3><p>{benefit.text}</p><div className="solution-signal"><BarChart3 size={14}/><span>{benefit.signal}</span></div>
        </article>)}</div>
        <p className="solution-benefits-note">These are growth opportunities and measurement suggestions, not guaranteed results.</p>
      </div>
    </section>

    <section className="section solution-deliverables" id="included">
      <div className="container">
        <div className="solution-section-heading"><span className="section-kicker">WHAT'S INCLUDED</span><h2>Practical work. Clear outcomes.</h2><p>Choose the components that fit your business. The final scope is agreed on before implementation.</p></div>
        <div className="solution-deliverables-grid">{solution.deliverables.map(d=><article key={d.title} className="solution-deliverable-card"><span><Check size={18}/></span><div><h3>{d.title}</h3><p>{d.text}</p></div></article>)}</div>
        {solution.slug==='web-development' && <div className="solution-web-note"><Code2 size={22}/><span>From marketing websites and e-commerce to custom React/Next.js applications, the right solution depends on the workflow—not the trendiest framework.</span></div>}
      </div>
    </section>

    <section className="section solution-process">
      <div className="container">
        <div className="solution-section-heading"><span className="section-kicker">HOW WE WORK</span><h2>A thoughtful process from idea to delivery.</h2><p>Plan first, validate what matters, and keep business priorities at the center.</p></div>
        <div className="solution-process-grid">{solution.workflow.map((step,i)=><article className="solution-step" key={step.title}><span>{String(i+1).padStart(2,'0')}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </div>
    </section>

    <section className="section solution-faqs">
      <div className="container solution-faq-layout">
        <div><span className="section-kicker">BEFORE WE BEGIN</span><h2>A few common questions.</h2><p>Each project starts with a clear discussion about priorities and scope.</p></div>
        <div className="solution-faq-items">{solution.faqs.map(f=><details key={f.question}><summary>{f.question}<ChevronDown size={18}/></summary><p>{f.answer}</p></details>)}</div>
      </div>
    </section>

    <section className="section solution-related">
      <div className="container">
        <div className="solution-section-heading"><span className="section-kicker">SOLUTIONS THAT WORK TOGETHER</span><h2>Explore connected capabilities.</h2><p>Some projects benefit from a combination of technical, creative, and operational expertise.</p></div>
        <div className="solution-related-grid">{related.map(s=><a className="solution-related-card" key={s.slug} href={solutionHref(s.slug)}><span>{s.category}</span><h3>{s.name}</h3><p>{s.promise}</p><span className="solution-related-arrow">Explore Solution <ArrowUpRight size={17}/></span></a>)}</div>
      </div>
    </section>

    <section className="solution-final-cta"><div className="container solution-final-inner"><div><span className="section-kicker light">LET'S TALK ABOUT YOUR GOALS</span><h2>Ready to make your next move count?</h2><p>Share what you want to improve, and we can discuss a practical approach for your business.</p></div><div className="solution-final-buttons"><a href={contactHref(solution)} className="button button-white">Discuss {solution.name} <ArrowUpRight size={17}/></a><a href="mailto:lopez.anthonymark16@gmail.com" className="solution-email"><Mail size={16}/> Or email me directly</a></div></div></section>
  </main>;
}

export default function SolutionPage() {
  const [pageReady,setPageReady]=useState(false);
  useEffect(()=>{
    if (!currentSolution) {document.title='Page Not Found | Anthony Mark Lopez';setPageReady(true);return;}
    document.title=`${currentSolution.name} Solutions for Business Growth | Anthony Mark Lopez`;
    const description=`${currentSolution.subtitle} Learn about challenges, business growth opportunities, deliverables, and how to get started.`;
    const meta=document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if(meta)meta.content=description.slice(0,160);
    const title=document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if(title)title.content=document.title;
    const ogdesc=document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if(ogdesc)ogdesc.content=description.slice(0,160);
    setPageReady(true);
  },[]);
  return <div className="site-shell solution-page">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SolutionHeader/>
    {currentSolution ? <SolutionSections solution={currentSolution}/> : <main id="main-content" className="section"><div className="container solution-not-found"><ClipboardList size={42}/><h1>Solution page not found.</h1><p>The page you're looking for isn't available.</p><a className="button button-primary" href="/#solutions"><ArrowLeft size={17}/> Browse Solutions</a></div></main>}
    <footer className="footer"><div className="container footer-inner"><a href="/" className="footer-brand"><img src={profilePhoto} alt=""/> Anthony Mark Lopez</a><span>Digital solutions · Web · GHL · Design · Support</span><span>© {new Date().getFullYear()} All rights reserved.</span></div></footer>
    {currentSolution && <a href={contactHref(currentSolution)} className="mobile-sticky-cta"><ShieldCheck size={17} aria-hidden="true"/> Discuss Your Project <ArrowUpRight size={16} aria-hidden="true"/></a>}
    <span className="solution-page-ready" hidden>{pageReady?'ready':'loading'}</span>
  </div>;
}
