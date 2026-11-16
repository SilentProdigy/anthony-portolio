import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Code2, Workflow, Palette, Megaphone, Headphones, Menu, X, Pause, Play, ExternalLink, Mail, Globe, ShoppingBag, Smartphone, Gauge, PlugZap, CircleHelp } from 'lucide-react';
import profile from './assets/img/anthony-portrait.jpg';
import vouxr from './assets/img/vouxr-banner.png';
import fleet from './assets/img/fleetrackr-mobile-app.png';
import './landing.css';

const services = [
  { title:'GoHighLevel Specialist', icon:Workflow, featured:true, description:'CRM setup and optimization, pipeline management, smart automations, forms, funnels, email campaigns, and platform integrations.' },
  { title:'Web Specialist', icon:Code2, description:'Conversion-focused websites, WordPress, Shopify, custom web apps, landing pages, and performance improvements.' },
  { title:'Graphic Designer', icon:Palette, description:'Marketing creatives, social graphics, brand assets, digital ads, banners, and campaign visuals.' },
  { title:'Social Media Management', icon:Megaphone, description:'Content planning, calendars, creative production, publishing coordination, and performance reporting.' },
  { title:'Technical Support', icon:Headphones, description:'Website fixes, platform troubleshooting, hosting and DNS, integrations, updates, and ongoing support.' }
];
const webServices = [
  {title:'Web Development',icon:Code2,description:'Responsive modern websites and tailored front-end experiences.'},
  {title:'WordPress & WooCommerce',icon:Globe,description:'Business websites, custom functionality, and online stores.'},
  {title:'Shopify & CRO',icon:ShoppingBag,description:'Theme development, product UX, Liquid customization, and conversion improvements.'},
  {title:'Custom Web Apps & PWAs',icon:Smartphone,description:'Dashboards, POS, loyalty platforms, and business software.'},
  {title:'Landing Pages & Funnels',icon:Gauge,description:'Campaign-ready pages, lead flows, and conversion testing.'},
  {title:'Integrations & Maintenance',icon:PlugZap,description:'APIs, automations, performance, SEO foundations, and support.'}
];
const outcomes=['Capture more leads','Automate busywork','Build better websites','Strengthen branding','Keep systems running'];
const projects=[
  {title:'Vouxr Rewards',category:'Loyalty & PWA',image:vouxr,description:'Memberships, points, stamp cards, and customer reward workflows.',url:'https://vouxr-ai.vercel.app/'},
  {title:'FleeTracker',category:'Rental Management',image:fleet,description:'Mobile-first fleet and booking management for rental operations.',url:'https://fleetrackr.vercel.app/'},
  {title:'Eagles-Wings POS',category:'Business Applications',image:null,description:'Multi-store sales, inventory, and business reporting workflows.',url:'https://eagles-wings-pos.vercel.app/'}
];
const questions=[
  ['Can I hire you for just one service?','Yes. I work on individual projects and combinations of website, CRM, creative, social media, and support work.'],
  ['Can you work with my existing website or GHL account?','Yes. I can review an existing setup and propose improvements, troubleshooting, or ongoing maintenance based on access and scope.'],
  ['Do you handle both design and development?','Yes. Engagements can include both design and implementation, or a clearly defined part of the process.'],
  ['How are pricing and timelines determined?','They depend on the scope, integrations, deliverables, and complexity. Share your requirements and we can discuss a practical plan.']
];
function BranchGraphic({paused}:{paused:boolean}){
  return <div className={'branch-wrap'+(paused?' paused':'')} aria-label="Five digital services connect through one partner to create business outcomes">
    <svg className="branch-lines" viewBox="0 0 980 470" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="incoming"><stop stopColor="#75beff"/><stop offset="1" stopColor="#6660ed"/></linearGradient><linearGradient id="outgoing"><stop stopColor="#7160ee"/><stop offset="1" stopColor="#8b6bf4"/></linearGradient></defs>
      {[58,145,232,319,406].map((y,i)=><g key={'in'+i}><path className="branch-base" d={`M 275 ${y} C 360 ${y}, 365 235, 435 235`}/><path className="branch-path" stroke="url(#incoming)" d={`M 275 ${y} C 360 ${y}, 365 235, 435 235`}/><circle className="branch-signal" r="4" fill="#9bddff"><animateMotion dur={`${3.4+i*.25}s`} begin={`${i*.38}s`} repeatCount="indefinite" path={`M 275 ${y} C 360 ${y}, 365 235, 435 235`}/></circle></g>)}
      {[58,145,232,319,406].map((y,i)=><g key={'out'+i}><path className="branch-base" d={`M 555 235 C 635 235, 625 ${y}, 705 ${y}`}/><path className="branch-path" stroke="url(#outgoing)" d={`M 555 235 C 635 235, 625 ${y}, 705 ${y}`}/><circle className="branch-signal" r="4" fill="#d8bcff"><animateMotion dur={`${3.7+i*.3}s`} begin={`${i*.3}s`} repeatCount="indefinite" path={`M 555 235 C 635 235, 625 ${y}, 705 ${y}`}/></circle></g>)}
    </svg>
    <div className="branch-left">{services.map((s,i)=><div className="branch-item" key={s.title} style={{animationDelay:`${i*90}ms`}}><s.icon size={19}/><span>{s.title}</span></div>)}</div>
    <div className="branch-hub"><img src={profile} alt="Anthony Mark Lopez" /><div className="hub-label"><small>ONE DIGITAL PARTNER</small><strong>Everything works together.</strong></div></div>
    <div className="branch-right">{outcomes.map((o,i)=><div className="branch-item outcome" key={o} style={{animationDelay:`${i*90}ms`}}><Check size={17}/><span>{o}</span></div>)}</div>
  </div>;
}
function App(){
  const [menu,setMenu]=useState(false);
  const [paused,setPaused]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [lead,setLead]=useState({name:'',email:'',service:'',message:''});
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    setPaused(media.matches);
    const onChange=()=>setPaused(media.matches);
    media.addEventListener('change',onChange);
    return ()=>media.removeEventListener('change',onChange);
  },[]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.1});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    return ()=>observer.disconnect();
  },[]);
  useEffect(()=>{document.documentElement.classList.toggle('motion-off',paused);return ()=>document.documentElement.classList.remove('motion-off')},[paused]);
  const submit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const subject=encodeURIComponent('New '+lead.service+' consultation inquiry');
    const body=encodeURIComponent(`Name: ${lead.name}\nEmail: ${lead.email}\nService: ${lead.service}\n\nProject details:\n${lead.message}`);
    setSubmitted(true);
    window.location.href=`mailto:lopez.anthonymark16@gmail.com?subject=${subject}&body=${body}`;
  };
  const nav=[['Services','#services'],['Web Solutions','#web'],['Work','#work'],['Process','#process'],['FAQs','#faq']];
  return <div className="site-shell" id="top">
    <header className="navbar"><div className="container navrow">
      <a className="brand" href="#top" aria-label="Anthony Mark Lopez home"><img src={profile} alt="" className="brand-portrait"/><span><strong>Anthony Mark Lopez</strong><small>Digital Solutions Specialist</small></span></a>
      <nav className={'navlinks '+(menu?'open':'')} aria-label="Main navigation">{nav.map(([name,to])=><a onClick={()=>setMenu(false)} key={name} href={to}>{name}</a>)}<a className="nav-mobile-contact" href="#contact" onClick={()=>setMenu(false)}>Let's Talk</a></nav>
      <a href="#contact" className="button primary navbutton">Get a Consultation <ArrowUpRight size={17}/></a>
      <button className="menu-toggle" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
    </div></header>
    <main>
      <section className="hero"><div className="container">
        <div className="hero-intro"><span className="kicker"><span className="kicker-dot"/> YOUR DIGITAL GROWTH PARTNER</span><h1>Helping businesses grow through <span className="gradient-text">websites, automation, design,</span> and support.</h1><p>I help businesses attract more leads, streamline operations, and strengthen their online presence through practical, creative, and reliable digital solutions.</p>
          <div className="hero-actions"><a className="button primary" href="#contact">Let's Discuss Your Project <ArrowRight size={18}/></a><a className="button outline" href="#services">Explore Services <ArrowUpRight size={18}/></a></div>
          <div className="trustline"><span><Check size={15}/> Strategy & Setup</span><span><Check size={15}/> Execution & Support</span><span><Check size={15}/> Business-Focused</span></div>
        </div>
        <div className="hero-flow-head"><span>FIVE SPECIALTIES. ONE PARTNER.</span><button type="button" className="motion-toggle" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?<Play size={15}/>:<Pause size={15}/>} {paused?'Play motion':'Pause motion'}</button></div>
        <BranchGraphic paused={paused}/>
      </div></section>
      <div className="platforms"><div className="container platform-content"><span>TOOLS & PLATFORMS</span><div>{['GoHighLevel','WordPress','Shopify','React / Next.js','Supabase','Canva'].map(x=><strong key={x}>{x}</strong>)}</div></div></div>
      <section className="section" id="services"><div className="container"><div className="section-heading reveal"><span className="eyebrow">01 / What I Do</span><h2>Specialized digital services.<br/>One reliable point of contact.</h2><p>From your first landing page to the systems behind your business, get the right expertise for every step.</p></div><div className="service-grid">{services.map((s,i)=><article className={'service-card reveal '+(s.featured?'featured':'')} key={s.title}><div className="service-icon"><s.icon size={24}/></div><h3>{s.title}</h3><p>{s.description}</p><a href={s.title==='Web Specialist'?'#web':'#contact'}>{s.title==='Web Specialist'?'Explore web services':'Discuss this service'} <ArrowUpRight size={16}/></a>{i===0&&<span className="service-featured-tag">CRM & AUTOMATION</span>}</article>)}</div></div></section>
      <section id="web" className="web-section"><div className="container web-layout"><div className="web-copy reveal"><span className="eyebrow">02 / Web Specialist</span><h2>Websites and systems that work as hard as you do.</h2><p>Build new digital experiences, improve existing storefronts, or create custom applications around how your business operates.</p><a className="button light" href="#contact">Discuss a Web Project <ArrowUpRight size={17}/></a></div><div className="web-cards">{webServices.map(s=><article className="web-card reveal" key={s.title}><s.icon size={23}/><h3>{s.title}</h3><p>{s.description}</p></article>)}</div></div></section>
      <section className="section work-section" id="work"><div className="container"><div className="section-heading reveal"><span className="eyebrow">03 / Selected Work</span><h2>Built for real business needs.</h2><p>Selected web application projects showing practical solutions—not just polished screens.</p></div><div className="project-grid">{projects.map((p,i)=><article className="project-card reveal" key={p.title}><div className={'project-preview project-preview-'+i}>{p.image?<img src={p.image} alt={p.title+' application screenshot'} loading="lazy"/>:<div className="project-fallback"><Code2 size={46}/><strong>Eagles-Wings POS</strong><small>Multi-store operations platform</small></div>}</div><div className="project-content"><span>{p.category}</span><h3>{p.title}</h3><p>{p.description}</p><a href={p.url} target="_blank" rel="noopener noreferrer">View Project <ExternalLink size={15}/></a></div></article>)}</div></div></section>
      <section className="section process-section" id="process"><div className="container"><div className="section-heading reveal"><span className="eyebrow">04 / How I Work</span><h2>From challenge to solution.</h2><p>A collaborative process built around your goals, priorities, and deliverables.</p></div><div className="step-grid">{[['01','Discover','Understand your goals, audience, challenges, and requirements.'],['02','Plan','Set priorities, agree on the scope, and outline deliverables.'],['03','Build','Design, develop, automate, integrate, and communicate progress.'],['04','Test & Support','Validate the work, hand it over, and plan ongoing improvements.']].map(([n,t,d])=><article className="step-card reveal" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
      <section className="section faq-section" id="faq"><div className="container faq-layout"><div className="reveal"><span className="eyebrow">05 / FAQs</span><h2>Questions before we start?</h2><p>Here's what working together can look like.</p><CircleHelp className="faq-art" size={80}/></div><div className="faq-accordion reveal">{questions.map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={19}/></summary><p>{a}</p></details>)}</div></div></section>
      <section className="contact-section" id="contact"><div className="container contact-layout"><div className="contact-copy reveal"><span className="eyebrow">06 / Let's Connect</span><h2>Have a project in mind? <span>Let's make it happen.</span></h2><p>Tell me what you're working on, what you'd like to improve, or which system needs attention.</p><div className="contact-points"><span><CalendarDays size={18}/> Project-based and ongoing support</span><span><Mail size={18}/> <a href="mailto:lopez.anthonymark16@gmail.com">lopez.anthonymark16@gmail.com</a></span></div></div><form className="lead-form reveal" onSubmit={submit}><h3>Tell me about your project</h3><p>Submitting opens your email application with your inquiry ready to send.</p><div className="form-grid"><label>Your name<input required maxLength={100} value={lead.name} onChange={e=>setLead({...lead,name:e.target.value})} placeholder="Full name"/></label><label>Business email<input required type="email" maxLength={254} value={lead.email} onChange={e=>setLead({...lead,email:e.target.value})} placeholder="you@company.com"/></label><label className="full">What do you need help with?<select required value={lead.service} onChange={e=>setLead({...lead,service:e.target.value})}><option value="">Select a service</option>{services.map(s=><option key={s.title}>{s.title}</option>)}<option>Multiple Services / Not Sure Yet</option></select></label><label className="full">Project details<textarea required minLength={10} maxLength={3000} rows={5} value={lead.message} onChange={e=>setLead({...lead,message:e.target.value})} placeholder="What are you hoping to build, improve, or solve?"/></label></div><button type="submit" className="button primary submit-button">Prepare Consultation Email <ArrowRight size={17}/></button><p className="privacy-note" role="status">{submitted?'Your email app should open. Please send the prepared email to complete your inquiry.':'No information is stored on this website. GHL integration is not active yet.'}</p></form></div></section>
    </main>
    <footer><div className="container footer-row"><a href="#top" className="footer-brand"><img src={profile} alt=""/> Anthony Mark Lopez</a><span>Digital Services · Development · Automation · Design</span><span>© {new Date().getFullYear()} All rights reserved.</span></div></footer><a className="mobile-fixed-cta" href="#contact">Discuss Your Project <ArrowRight size={17}/></a>
  </div>;
}
export default App;
