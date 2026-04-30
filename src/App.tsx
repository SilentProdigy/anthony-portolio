import { useMemo, useState } from "react";
import profilePhoto from "./assets/img/profile-photo.png";
import {
  ArrowUpRight,
  Code2,
  Palette,
  Layout,
  Smartphone,
  Mail,
  Menu,
  X,
  Sparkles,
  PenTool,
  Moon,
  Sun,
  Search,
  ExternalLink,
  CheckCircle2,
  Zap,
} from "lucide-react";

const services = [
  {
    icon: <Code2 size={22} />,
    title: "Web Development",
    desc: "Custom responsive websites, business systems, landing pages, and scalable front-end interfaces built with clean modern code.",
  },
  {
    icon: <Layout size={22} />,
    title: "WordPress & WooCommerce",
    desc: "Professional WordPress websites, Elementor builds, WooCommerce stores, plugin customization, and performance optimization.",
  },
  {
    icon: <Smartphone size={22} />,
    title: "PWA & Business Apps",
    desc: "Mobile-first progressive web applications for POS, ordering systems, loyalty platforms, business hubs, and sales trackers.",
  },
  {
    icon: <Palette size={22} />,
    title: "Web & Graphic Design",
    desc: "Minimal, brand-focused layouts, social media creatives, posters, digital ads, UI concepts, and visual identity support.",
  },
];

const skills = [
  "React JS",
  "TypeScript",
  "Next.js",
  "Firebase",
  "Supabase",
  "WordPress",
  "WooCommerce",
  "Elementor",
  "HTML/CSS/JS",
  "Tailwind CSS",
  "PHP",
  "SEO",
  "Canva",
  "Photoshop",
  "Illustrator",
  "UI/UX Design",
];

const projects = [
  {
    category: "PWA / SaaS",
    title: "Loyalty Rewards Platform",
    desc: "A mobile-first rewards system with QR scanning, customer enrollment, merchant dashboards, stamp cards, and reward coins.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Firebase", "PWA"],
    url: "http://loyalapp.vercel.app/",
  },
  {
    category: "E-commerce",
    title: "Shopify Storefront Customization",
    desc: "Customized Shopify storefront with optimized product pages, conversion-focused layouts, performance enhancements, and seamless user experience tailored for higher sales and engagement.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Shopify", "Liquid", "UI/UX", "Conversion Optimization"],
    url: "https://pushtrees.com/",
  },
  {
    category: "WordPress",
    title: "WooCommerce Product Gallery Plugin",
    desc: "A custom shortcode-based WooCommerce gallery with AJAX filters, search sidebar, admin settings, and responsive layout.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["PHP", "AJAX", "WooCommerce"],
    url: "https://megavar.com.au/equipment-rentals/",
  },
  {
    category: "WordPress",
    title: "Wordpress Design & Development",
    desc: "A custom shortcode-based WooCommerce gallery with AJAX filters, search sidebar, admin settings, and responsive layout.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["PHP", "AJAX", "WooCommerce"],
    url: "https://inlightconnect.com",
  },
  {
    category: "Graphic Design",
    title: "Sports & Brand Creatives",
    desc: "High-impact posters, campaign graphics, social media layouts, apparel concepts, and branded visual content.",
    image: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Photoshop", "Canva", "Branding"],
    url: "https://drive.google.com/drive/folders/1vXR_38pHP1ZaSb1G1vERa19YHEWbN_xX?usp=drive_link",
  },
  {
    category: "Custom Web System",
    title: "Multi-Business POS & Sales Tracker",
    desc: "A scalable POS and sales tracking system supporting multiple businesses per user, real-time analytics, product management, and transaction history with mobile-first design.",
    image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Firebase", "POS"],
    url: "https://eagles-wings-pos.vercel.app/",
  }
];

const process = [
  "Discover goals, audience, and business requirements",
  "Design clean user journeys and conversion-focused layouts",
  "Develop responsive, scalable, and maintainable code",
  "Optimize speed, SEO, accessibility, and usability",
  "Launch, test, improve, and support growth",
];

export default function PortfolioWebsite() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const navItems = ["Services", "Skills", "Projects", "Process", "Contact"];
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      const keyword = search.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(keyword) ||
        project.desc.toLowerCase().includes(keyword) ||
        project.tags.join(" ").toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className={`portfolio-shell ${darkMode ? "dark" : "light"}`}>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        a { color: inherit; text-decoration: none; }
        button, input { font: inherit; }
        .portfolio-shell {
          --bg: #f7f4ef;
          --text: #171717;
          --muted: #626262;
          --soft: rgba(255,255,255,.62);
          --line: rgba(0,0,0,.11);
          --panel: #171717;
          --panelText: #ffffff;
          min-height: 100vh;
          background: radial-gradient(circle at top left, rgba(20,20,20,.08), transparent 32%), var(--bg);
          color: var(--text);
          transition: background .35s ease, color .35s ease;
        }
        .portfolio-shell.dark {
          --bg: #101010;
          --text: #f4f1ea;
          --muted: #b5b0a6;
          --soft: rgba(255,255,255,.06);
          --line: rgba(255,255,255,.12);
          --panel: #f4f1ea;
          --panelText: #141414;
          background: radial-gradient(circle at top right, rgba(255,255,255,.13), transparent 32%), var(--bg);
        }
        .container { width: 100%; max-width: 100%; padding: 0 20vh; margin: 0 auto;}
        .nav { position: sticky; top: 0; z-index: 30; backdrop-filter: blur(18px); background: color-mix(in srgb, var(--bg) 82%, transparent); border-bottom: 1px solid var(--line); }
        .nav-inner { height: 76px; display: flex; align-items: center; justify-content: space-between; }
        .brand { display: flex; align-items: center; gap: 12px; font-weight: 750; letter-spacing: -.04em; }
        .brand-mark {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--text);
        }

        .brand-mark img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.1);
        }
        
        .nav-links { display: flex; align-items: center; gap: 28px; font-size: 14px; color: var(--muted); }
        .nav-links a:hover { color: var(--text); }
        .nav-actions { display: flex; align-items: center; gap: 10px; }
        .icon-btn { width: 43px; height: 43px; border-radius: 999px; border: 1px solid var(--line); background: var(--soft); color: var(--text); display: inline-grid; place-items: center; cursor: pointer; transition: .2s ease; }
        .icon-btn:hover { transform: translateY(-2px); }
        .nav-cta { background: var(--text); color: var(--bg); padding: 11px 17px; border-radius: 999px; display: inline-flex; gap: 7px; align-items: center; }
        .menu-btn { display: none; border: 0; background: transparent; color: var(--text); }
        .mobile-menu { display: none; }
        .hero { padding: 86px 0 70px; }
        .hero-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 52px; align-items: center; }
        .eyebrow { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--line); border-radius: 999px; padding: 9px 13px; font-size: 13px; color: var(--muted); background: var(--soft); }
        .hero h1 {
          font-size: clamp(48px, 8vw, 104px);
          line-height: .92;
          letter-spacing: -.08em;
          margin: 24px 0;
          max-width: 900px;
          color: var(--text); /* FIX: force visible heading */
        }
        .hero h1 span {
          color: transparent;
          -webkit-text-stroke: 1.2px var(--text);
          opacity: 0.25; /* FIX: reduce ghost text visibility */
        }
        .hero p { font-size: clamp(17px, 2vw, 21px); line-height: 1.7; color: var(--muted); max-width: 670px; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 34px; }
        .btn { border-radius: 999px; padding: 14px 19px; display: inline-flex; align-items: center; gap: 8px; font-weight: 650; border: 1px solid var(--text); transition: .2s ease; cursor: pointer; }
        .btn-dark { background: var(--text); color: var(--bg); }
        .btn-light { background: transparent; }
        .btn:hover { transform: translateY(-2px); }
        .hero-card { border: 1px solid var(--line); border-radius: 34px; background: var(--soft); padding: 20px; box-shadow: 0 30px 80px rgba(0,0,0,.08); }
        .profile-panel { border-radius: 26px; min-height: 460px; background: var(--panel); color: var(--panelText); padding: 28px; display: flex; flex-direction: column; position: relative; overflow: hidden; }
        .profile-panel::before { content: ""; position: absolute; width: 340px; height: 340px; border: 1px solid color-mix(in srgb, var(--panelText) 18%, transparent); border-radius: 50%; right: -130px; top: -70px; }
        .profile-panel::after { content: ""; position: absolute; width: 190px; height: 190px; background: color-mix(in srgb, var(--panelText) 8%, transparent); border-radius: 50%; left: -60px; bottom: 30px; }
        .panel-top { position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: flex-start; }
        .availability { font-size: 13px; border: 1px solid color-mix(in srgb, var(--panelText) 18%, transparent); padding: 8px 12px; border-radius: 999px; }
        .panel-title { position: relative; z-index: 2; }
        .panel-title h2 { font-size: 52px; line-height: .95; letter-spacing: -.06em; margin: 0 0 14px; color: var(--panelText); }
        .panel-title p { color: color-mix(in srgb, var(--panelText) 72%, transparent); line-height: 1.7; margin: 0; }
        .floating-stack { position: absolute; inset: auto 24px 34px auto; z-index: 3; display: grid; gap: 10px; }
        .floating-pill { display: flex; align-items: center; gap: 8px; background: color-mix(in srgb, var(--panelText) 10%, transparent); border: 1px solid color-mix(in srgb, var(--panelText) 16%, transparent); backdrop-filter: blur(12px); padding: 10px 12px; border-radius: 999px; font-size: 13px; animation: float 4s ease-in-out infinite; }
        .floating-pill:nth-child(2) { animation-delay: .7s; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-top: 34px; }
        .stat { border-top: 1px solid var(--line); padding-top: 18px; }
        .stat strong { font-size: 34px; letter-spacing: -.05em; display: block; }
        .stat span { color: var(--muted); font-size: 14px; }
        section { padding: 84px 0; }
        .section-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 30px; margin-bottom: 34px; }
        .section-head h2 {
          font-size: clamp(34px, 5vw, 64px);
          letter-spacing: -.07em;
          margin: 0;
          line-height: .98;
          max-width: 690px;
          color: var(--text); /* FIX: ensure strong contrast */
        }
        .section-head p { color: var(--muted); line-height: 1.7; max-width: 430px; margin: 0; }
        .service-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .service-card, .project-card, .process-card { background: var(--soft); border: 1px solid var(--line); border-radius: 28px; transition: .2s ease; }
        .service-card { padding: 24px; }
        .service-card:hover, .project-card:hover { transform: translateY(-5px); box-shadow: 0 25px 60px rgba(0,0,0,.08); }
        .service-icon { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 16px; background: var(--text); color: var(--bg); margin-bottom: 34px; }
        .service-card h3, .project-card h3 { letter-spacing: -.04em; font-size: 22px; margin: 0 0 12px; }
        .service-card p, .project-card p { color: var(--muted); line-height: 1.65; margin: 0; }
        .skills-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill-pill { padding: 12px 16px; border: 1px solid var(--line); border-radius: 999px; background: var(--soft); color: var(--text); transition: .2s ease; }
        .skill-pill:hover { transform: translateY(-3px); background: var(--text); color: var(--bg); }
        .project-tools { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: 22px; }
        .category-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
        .tab { border: 1px solid var(--line); background: var(--soft); color: var(--text); padding: 10px 13px; border-radius: 999px; cursor: pointer; transition: .2s ease; }
        .tab.active, .tab:hover { background: var(--text); color: var(--bg); }
        .search-box { min-width: min(100%, 300px); display: flex; align-items: center; gap: 8px; border: 1px solid var(--line); background: var(--soft); border-radius: 999px; padding: 0 14px; }
        .search-box input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--text); padding: 12px 0; }
        .project-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 18px; }
        .project-card { overflow: hidden; display: flex; flex-direction: column; }
        .project-image { height: 245px; position: relative; overflow: hidden; }
        .project-image img { width: 100%; height: 100%; object-fit: cover; display: block; filter: saturate(.85); transition: .45s ease; }
        .project-card:hover .project-image img { transform: scale(1.08); filter: saturate(1); }
        .project-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.55), transparent 65%); display: flex; justify-content: space-between; align-items: flex-end; padding: 18px; color: #fff; }
        .category { font-size: 13px; border: 1px solid rgba(255,255,255,.35); background: rgba(255,255,255,.14); backdrop-filter: blur(12px); border-radius: 999px; padding: 8px 12px; }
        .project-body { padding: 24px; display: flex; flex-direction: column; flex: 1; justify-content: space-between; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
        .project-tags span { font-size: 12px; background: var(--text); color: var(--bg); padding: 7px 10px; border-radius: 999px; }
        .empty-state { border: 1px dashed var(--line); border-radius: 28px; padding: 30px; color: var(--muted); }
        .process-list { counter-reset: steps; display: grid; gap: 12px; }
        .process-card { display: grid; grid-template-columns: 90px 1fr auto; align-items: center; padding: 24px; }
        .process-card::before { counter-increment: steps; content: "0" counter(steps); font-size: 28px; letter-spacing: -.05em; color: var(--muted); }
        .process-card p { margin: 0; font-size: 20px; letter-spacing: -.03em; }
        .process-card svg { color: var(--muted); }
        .cta-section { padding-bottom: 110px; }
        .cta-card { background: var(--panel); color: var(--panelText); border-radius: 40px; padding: clamp(34px, 6vw, 70px); display: grid; grid-template-columns: 1fr auto; gap: 30px; align-items: end; position: relative; overflow: hidden; }
        .cta-card::before { content: ""; position: absolute; width: 360px; height: 360px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--panelText) 15%, transparent); right: -110px; top: -130px; }
        .cta-card h2 {
          font-size: clamp(38px, 6vw, 76px);
          letter-spacing: -.07em;
          line-height: .95;
          margin: 0 0 18px;
          max-width: 780px;
          position: relative;
          z-index: 1;
          color: var(--panelText); /* FIX contrast */
        }
        .cta-card p { color: color-mix(in srgb, var(--panelText) 72%, transparent); font-size: 18px; line-height: 1.7; margin: 0; max-width: 620px; position: relative; z-index: 1; }
        .cta-card .btn { border-color: var(--panelText); position: relative; z-index: 1; white-space: nowrap; color: var(--panelText); }
        footer { border-top: 1px solid var(--line); padding: 26px 0; color: var(--muted); font-size: 14px; }
        .footer-inner { display: flex; justify-content: space-between; gap: 20px; }
        @media (max-width: 980px) {
          .hero-grid, .cta-card { grid-template-columns: 1fr; }
          .service-grid { grid-template-columns: repeat(2,1fr); }
          .section-head { align-items: flex-start; flex-direction: column; }
        }
        @media (max-width: 720px) {
          .container { width: min(100% - 28px, 1160px); padding:0px; }
          .nav-links, .nav-cta { display: none; }
          .menu-btn { display: inline-grid; place-items: center; }
          .mobile-menu { display: grid; gap: 14px; padding: 0 0 22px; font-size: 15px; }
          .mobile-menu a { padding: 12px 0; border-bottom: 1px solid var(--line); }
          .hero { padding-top: 54px; }
          .profile-panel { min-height: 390px; }
          .panel-title h2 { font-size: 42px; }
          .stats, .service-grid, .project-grid { grid-template-columns: 1fr; }
          .project-tools { align-items: stretch; }
          .search-box { width: 100%; }
          .process-card { grid-template-columns: 58px 1fr; }
          .process-card svg { display: none; }
          .process-card p { font-size: 17px; }
          .footer-inner { flex-direction: column; }
        }
      `}</style>

      <nav className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">
              <img src={profilePhoto} alt="Anthony Lopez" />
            </span>
            <span>Anthony Mark Lopez</span>
          </a>

          <div className="nav-links">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
            ))}
          </div>

          <div className="nav-actions">
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a className="nav-cta" href="mailto:lopez.anthonymark16@gmail.com">
              Work with me <ArrowUpRight size={16} />
            </a>
            <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {open && (
          <div className="container mobile-menu">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>
            ))}
          </div>
        )}
      </nav>

      <header className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow"><Sparkles size={15} /> Fullstack Web Developer • Designer • Creative Builder</span>
            <h1>Designing digital products that look clean, work fast, and convert better<span>.</span></h1>
            <p>
              I create professional websites, custom web applications, WordPress solutions, e-commerce platforms, PWAs, and brand-focused graphics for businesses that need both strong visuals and reliable functionality.
            </p>
            <div className="hero-actions">
              <a className="btn btn-dark" href="#projects">View Selected Work <ArrowUpRight size={17} /></a>
              <a className="btn btn-light" href="#contact">Start a Project</a>
            </div>
          </div>

          <div className="hero-card">
            <div className="profile-panel">
              <div className="panel-top">
                <PenTool />
                <span className="availability">Available for Projects</span>
              </div>
              <div className="floating-stack">
                <span className="floating-pill"><Zap size={14} /> Fast websites</span>
                <span className="floating-pill"><CheckCircle2 size={14} /> Business-ready UI</span>
              </div>
              <div className="panel-title">
                <h2>Web. App. Brand.</h2>
                <p>One creative technical partner for development, design, optimization, and digital growth.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container stats">
          <div className="stat"><strong>6+</strong><span>Years in Web Development</span></div>
          <div className="stat"><strong>3-in-1</strong><span>Developer, Designer, Creative</span></div>
          <div className="stat"><strong>100%</strong><span>Mobile-first Execution</span></div>
        </div>
      </header>

      <section id="services">
        <div className="container">
          <div className="section-head">
            <h2>Strategic services for brands that need more than just a template.</h2>
            <p>I combine development, design, and marketing awareness to build digital experiences that are polished, practical, and business-ready.</p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <div className="section-head">
            <h2>Tools and technologies I use to turn ideas into finished products.</h2>
            <p>From modern front-end stacks to WordPress, WooCommerce, Firebase, visual design, and content-ready creative assets.</p>
          </div>

          <div className="skills-wrap">
            {skills.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <div className="section-head">
            <h2>Interactive project gallery with real visual previews.</h2>
            <p>Filter by category or search by keyword to explore selected project directions and capabilities.</p>
          </div>

          <div className="project-tools">
            <div className="category-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`tab ${activeCategory === category ? "active" : ""}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="search-box">
              <Search size={16} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects..."
              />
            </label>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="project-grid">
              {filteredProjects.map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <span className="category">{project.category}</span>
                      <a href={project.url} aria-label={`View ${project.title}`}><ExternalLink size={20} /></a>
                    </div>
                  </div>
                  <div className="project-body">
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.desc}</p>
                    </div>
                    <div className="project-tags">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">No projects found. Try another keyword or category.</div>
          )}
        </div>
      </section>

      <section id="process">
        <div className="container">
          <div className="section-head">
            <h2>A clear build process from idea to launch.</h2>
            <p>Every project is handled with structure, clean execution, and attention to business goals.</p>
          </div>

          <div className="process-list">
            {process.map((item) => <div className="process-card" key={item}><p>{item}</p><CheckCircle2 size={22} /></div>)}
          </div>
        </div>
      </section>

      <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-card">
            <div>
              <h2>Need a website, system, or creative campaign that feels premium?</h2>
              <p>Let’s build a custom digital solution that fits your business, looks professional, and performs across every device.</p>
            </div>
            <a className="btn btn-light" href="mailto:lopez.anthonymark16@gmail.com">
              <Mail size={18} /> Contact Me
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Anthony Mark Lopez. Portfolio Website.</span>
          <span>Web Development • Web Design • Graphic Design</span>
        </div>
      </footer>
    </main>
  );
}
