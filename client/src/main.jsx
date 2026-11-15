import React, { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Bot, Boxes, BriefcaseBusiness, Building2, ChevronRight, Cloud, Code2, Cpu, GraduationCap, Layers3, MapPin, Menu, MessagesSquare, Monitor, Send, Sparkles, Workflow, X } from 'lucide-react';
import { api } from './api.js';
import Admin from './admin.jsx';
import { useScrollReveal, CatalogCount } from './scroll-effects.jsx';
import './style.css';
import './presentation.css';
import './motion.css';

const company = 'Platinum Technology';
const category = { services: ['dich-vu', 'Dịch vụ'], products: ['san-pham', 'Sản phẩm'], projects: ['du-an', 'Dự án'] };
const entryIcons = {
  'phat-trien-phan-mem': Code2, 'ai-va-ai-agent': Sparkles, 'ui-ux': Monitor, 'cloud-devops': Cloud,
  'dao-tao-cong-nghe': GraduationCap, linora: Layers3, 'linora-erp': Boxes, 'linora-ai': Cpu,
  'platinum-ai-agentic': Workflow,
};
const categoryCopy = {
  services: 'Tìm lĩnh vực công nghệ phù hợp với nhu cầu của doanh nghiệp.',
  products: 'Khám phá danh mục sản phẩm của Platinum Technology.',
  projects: 'Tìm hiểu các dự án đã được Platinum công bố.',
};
const contactFields = [
  ['name', 'Họ và tên', 'text', 100, true, 'name'],
  ['email', 'Email', 'email', 254, true, 'email'],
  ['company', 'Tên công ty', 'text', 160, false, 'organization'],
  ['phone', 'Điện thoại', 'tel', 32, false, 'tel'],
];
function useData(path, refreshKey) {
  const [state, setState] = useState({});
  useEffect(() => {
    const abort = new AbortController();
    if (path) api(path, { signal: abort.signal }).then(data => setState({ path, data }))
      .catch(error => { if (!abort.signal.aborted) setState({ path, error }); });
    return () => abort.abort();
  }, [path, refreshKey]);
  return state.path === path ? state : {};
}
function Meta({ title, description }) {
  useEffect(() => {
    document.title = title ? title + ' | ' + company : company;
    document.querySelector('meta[name="description"]').content = description || 'Dịch vụ và sản phẩm của Công ty TNHH Công nghệ Platinum.';
  }, [title, description]);
  return null;
}
function Brand() {
  return <Link className="brand" to="/" aria-label="Platinum Technology — Trang chủ">
    <span className="brand-icon"><Layers3 size={24} aria-hidden="true" /></span>
    <span>PLATINUM<small>TECHNOLOGY</small></span>
  </Link>;
}
function Header({ projects, onChat }) {
  const [menu, setMenu] = useState(false);
  const links = [['/', 'Trang chủ'], ['/gioi-thieu', 'Giới thiệu'], ['/dich-vu', 'Dịch vụ'], ['/san-pham', 'Sản phẩm'],
    ...(projects ? [['/du-an', 'Dự án']] : []), ['/lien-he', 'Liên hệ']];
  return <header><div className="shell header">
    <Brand /><button className="icon-button mobile-menu" aria-label={menu ? 'Đóng menu' : 'Mở menu'} aria-expanded={menu}
      aria-controls="site-nav" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    <nav id="site-nav" aria-label="Điều hướng chính" className={menu ? 'visible' : ''}>
      {links.map(([url, label]) => <NavLink key={url} to={url} end={url === '/'} onClick={() => setMenu(false)}>{label}</NavLink>)}
    </nav>
    <button className="button top-ai" onClick={onChat}><Sparkles size={16} /> Hỏi AI</button>
  </div></header>;
}
function FooterCatalog({ group, refreshKey }) {
  const { data } = useData('/content/' + group, refreshKey);
  const [slug, title] = category[group];
  const base = '/' + slug;
  return <div className="footer-column">
    <h2><Link to={base}>{title}</Link></h2>
    {!!data?.length && <ul>{data.map(entry =>
      <li key={entry.slug}><Link to={base + '/' + entry.slug}>{entry.title}</Link></li>)}</ul>}
  </div>;
}

function Footer({ projects, refreshKey }) {
  return <footer className="site-footer">
    <div className="shell">
      <div className="footer-grid">
        <div className="footer-company">
          <Brand />
          <p>Công ty TNHH Công nghệ Platinum</p>
          <Link className="footer-location" to="/lien-he">
            <MapPin size={17} aria-hidden="true" /> Huế · Chi nhánh Đà Nẵng
          </Link>
        </div>
        <nav className="footer-nav" aria-label="Điều hướng cuối trang">
          <FooterCatalog group="services" refreshKey={refreshKey} />
          <FooterCatalog group="products" refreshKey={refreshKey} />
          <div className="footer-column">
            <h2>Công ty</h2>
            <ul>
              <li><Link to="/gioi-thieu">Giới thiệu</Link></li>
              {!!projects && <li><Link to="/du-an">Dự án</Link></li>}
              <li><Link to="/hoi-dap">Hỏi đáp</Link></li>
            </ul>
            <Link className="footer-cta" to="/lien-he">Liên hệ tư vấn <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </nav>
      </div>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Platinum Technology</small>
        <Link to="/quan-tri">Quản trị</Link>
      </div>
    </div>
  </footer>;
}

function Status({ error, missing = false }) {
  if (error?.status === 404 || missing) return <section className="shell page"><h1>Không tìm thấy nội dung</h1><Link to="/">Về trang chủ <ArrowRight size={16} /></Link></section>;
  return <p className="notice" role={error ? 'alert' : 'status'}>{error?.message || 'Đang tải nội dung…'}</p>;
}
function Cards({ entries, group, heading = 'h3' }) {
  const Heading = heading;
  return <div className={'card-grid ' + group}>{entries.map(item => {
    const Icon = entryIcons[item.slug] || (group === 'projects' ? BriefcaseBusiness : Boxes);
    return <Link className="card" key={item.slug} to={'/' + category[group][0] + '/' + item.slug}>
      <div className="card-top"><span className="tile"><Icon size={26} strokeWidth={1.7} aria-hidden="true" /></span>
        <span className="card-arrow"><ArrowUpRight size={18} aria-hidden="true" /></span></div>
      <Heading>{item.title}</Heading>{item.summary && <p>{item.summary}</p>}
    </Link>;
  })}</div>;
}
function Listing({ group, home = false }) {
  const { data, error } = useData('/content/' + group);
  const [url, title] = category[group];
  if (home && !data?.length) return null;
  return <section className={'catalog catalog-' + group + (home ? ' catalog-home' : '')} id={home ? url : undefined}>
    <div className={'shell section ' + (home ? '' : 'page')}>
      {!home && <Meta title={title} description={categoryCopy[group]} />}
      <div className="section-title catalog-heading" data-scroll-reveal>
        <div>{home && !!data?.length && <CatalogCount key={data.length} count={data.length} label={title.toLowerCase()} />}
          {home ? <h2>{title}</h2> : <h1>{title}</h1>}<p>{categoryCopy[group]}</p></div>
        {home && <Link to={'/' + url}>Xem tất cả <ArrowRight size={17} aria-hidden="true" /></Link>}
      </div>
      <div className={group === 'products' ? 'product-layout' : undefined}>
        {group === 'products' && <div className="product-visual" data-scroll-reveal aria-hidden="true" />}
        {data ? data.length ? <Cards entries={data} group={group} heading={home ? 'h3' : 'h2'} /> : <p className="notice">Nội dung đang được cập nhật.</p> : <Status error={error} />}
      </div>
    </div>
  </section>;
}
function Home({ onChat }) {
  const { data, error } = useData('/content/pages/trang-chu');
  const links = [
    ['/gioi-thieu', Building2, 'Về Platinum', 'Tìm hiểu về công ty'],
    ['/dich-vu', Layers3, 'Dịch vụ', 'Khám phá các lĩnh vực công nghệ'],
    ['/san-pham', Boxes, 'Sản phẩm', 'Xem danh mục sản phẩm'],
  ];
  return <><Meta description={data?.summary} />
    <section className="hero"><div className="shell hero-grid">
      <div className="hero-copy">{data ? <><p className="eyebrow"><span /> PLATINUM TECHNOLOGY</p><div className="hero-title-mask"><h1>{data.title}</h1></div><p>{data.summary}</p></> : <Status error={error} />}
        <div className="actions"><Link className="button primary" to="/lien-he">Trao đổi nhu cầu <ArrowRight size={18} aria-hidden="true" /></Link>
          <button className="button hero-alt" onClick={onChat}><Sparkles size={17} aria-hidden="true" /> Hỏi AI về Platinum</button></div>
      </div>
      <div className="hero-art" aria-hidden="true"><span className="hero-frame" /><span className="hero-glow" /></div>
    </div></section>
    <nav className="shell quick-nav" aria-label="Khám phá Platinum">
      {links.map(([url, Icon, title, description]) => <Link key={url} to={url}>
        <span className="tile"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span>
        <span><strong>{title}</strong><small>{description}</small></span>
        <ArrowUpRight size={17} aria-hidden="true" />
      </Link>)}
    </nav>
    <Listing group="services" home />
    <Listing group="products" home />
    <Listing group="projects" home />
    <section className="shell section"><div className="cta" data-scroll-reveal>
      <span className="cta-icon"><MessagesSquare size={30} strokeWidth={1.6} aria-hidden="true" /></span>
      <div><h2>Trao đổi về dự án của bạn</h2><p>Chia sẻ nhu cầu công nghệ qua biểu mẫu tư vấn.</p></div>
      <Link className="button primary" to="/lien-he">Liên hệ Platinum <ArrowRight size={17} aria-hidden="true" /></Link>
    </div></section>
  </>;
}
const aboutSections = ['tam-nhin-su-menh', 'gia-tri-cot-loi', 'doi-ngu', 'quy-trinh-hop-tac'];

function Paragraphs({ text }) {
  return text.split(/\n{2,}/).filter(Boolean).map((paragraph, index) =>
    <p className="body-text" key={index}>{paragraph}</p>);
}

function About() {
  const { data, error } = useData('/content/pages/gioi-thieu');
  const services = useData('/content/services');
  const pages = useData('/content/pages');
  if (!data) return <Status error={error} />;
  const extraSections = pages.data?.filter(entry => aboutSections.includes(entry.slug)) || [];

  return <article className="about-page">
    <Meta title={data.title} description={data.summary} />
    <section className="about-hero"><div className="shell">
      <nav className="breadcrumbs" aria-label="Đường dẫn trang">
        <Link to="/">Trang chủ</Link><ChevronRight size={15} aria-hidden="true" />
        <span aria-current="page">Giới thiệu</span>
      </nav>
      <div className="about-hero-grid">
        <div className="about-intro">
          <div className="about-marker"><Building2 size={22} strokeWidth={1.7} aria-hidden="true" /></div>
          <h1>{data.title}</h1>
          {data.summary && <p className="lead">{data.summary}</p>}
          <div className="actions">
            <Link className="button primary" to="/lien-he">Trao đổi hợp tác <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link className="button about-secondary" to="/dich-vu">Khám phá dịch vụ <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="about-visual" aria-hidden="true" />
      </div>
    </div></section>

    {data.body && <section className="shell about-overview" data-scroll-reveal>
      <h2>Tổng quan doanh nghiệp</h2>
      <div className="about-prose"><Paragraphs text={data.body} /></div>
    </section>}

    {extraSections.length > 0 && <div className="shell about-extras">
      {extraSections.map(entry => <section className="about-info" data-scroll-reveal id={entry.slug} key={entry.slug}>
        <h2>{entry.title}</h2>
        {entry.summary && <p className="lead">{entry.summary}</p>}
        <Paragraphs text={entry.body} />
      </section>)}
    </div>}

    {!!services.data?.length && <section className="about-expertise"><div className="shell">
      <div className="section-title catalog-heading" data-scroll-reveal>
        <h2>Lĩnh vực công nghệ</h2><Link to="/dich-vu">Tất cả dịch vụ <ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
      <ul className="about-service-list">{services.data.map(service => {
        const Icon = entryIcons[service.slug] || Layers3;
        return <li key={service.slug} data-scroll-reveal><Link to={'/dich-vu/' + service.slug}>
          <span className="tile"><Icon size={21} strokeWidth={1.75} aria-hidden="true" /></span>
          <span><strong>{service.title}</strong>{service.summary && <small>{service.summary}</small>}</span>
          <ArrowUpRight size={17} className="about-service-arrow" aria-hidden="true" />
        </Link></li>;
      })}</ul>
    </div></section>}
  </article>;
}


function Detail({ group }) {
  const { slug } = useParams();
  const { data, error } = useData('/content/' + group + '/' + slug);
  if (!data) return <Status error={error} />;
  const Icon = entryIcons[data.slug] || (group === 'projects' ? BriefcaseBusiness : Layers3);
  return <article className="detail-page"><Meta title={data.title} description={data.summary} />
    <div className="detail-banner"><div className="shell detail-inner">
      <nav aria-label="Đường dẫn trang" className="breadcrumbs"><Link to="/">Trang chủ</Link>
        {category[group] && <><ChevronRight size={15} aria-hidden="true" /><Link to={'/' + category[group][0]}>{category[group][1]}</Link></>}
        <ChevronRight size={15} aria-hidden="true" /><span aria-current="page">{data.title}</span>
      </nav>
      <div className="detail-head"><span className="tile"><Icon size={33} strokeWidth={1.6} aria-hidden="true" /></span>
        <div><h1>{data.title}</h1>{data.summary && <p className="lead">{data.summary}</p>}</div></div>
    </div></div>
    <div className="shell detail-inner detail-content">
      {group === 'products' && !data.summary && !data.body && <p className="body-text">Để tìm hiểu thêm về {data.title}, hãy gửi câu hỏi qua biểu mẫu liên hệ.</p>}
      <Paragraphs text={data.body} />
      <Link to="/lien-he" className="button primary">Trao đổi nhu cầu <ArrowRight size={17} aria-hidden="true" /></Link>
    </div>
  </article>;
}
function Faq() {
  const { data, error } = useData('/content/faqs');
  const { hash } = useLocation();
  useEffect(() => {
    if (!data || !hash) return;
    const target = document.getElementById(hash.slice(1));
    if (target) { target.open = true; target.scrollIntoView({ block: 'center' }); }
  }, [data, hash]);
  return <section className="shell page detail"><Meta title="Hỏi đáp" /><h1>Hỏi đáp về Platinum</h1>
    {data ? data.map(item => <details data-scroll-reveal key={item.slug} id={item.slug}><summary>{item.title}<ChevronRight size={18} aria-hidden="true" /></summary>
      <p>{item.summary}</p>{item.slug === "gui-yeu-cau" && <p><Link className="back" to="/lien-he">Mở trang Liên hệ</Link></p>}{item.body && <p className="body-text">{item.body}</p>}</details>) : <Status error={error} />}
  </section>;
}
function Contact() {
  const { data, error } = useData('/content/pages/lien-he');
  const [status, setStatus] = useState({});
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ busy: true });
    try {
      await api('/contact', { method: 'POST', body: Object.fromEntries(new FormData(form)) });
      form.reset();
      setStatus({ ok: true });
    } catch (error) { setStatus({ error: error.message }); }
  }
  return <section className="shell page contact-layout"><Meta title="Liên hệ" description={data?.summary} />
    <div className="contact-intro"><span className="tile"><MessagesSquare size={28} strokeWidth={1.7} aria-hidden="true" /></span>{data ? <><h1>{data.title}</h1><p className="lead">{data.summary}</p>{data.body && <p className="body-text">{data.body}</p>}</> :
      error?.status === 404 ? <h1>Liên hệ Platinum</h1> : <Status error={error} />}</div>
    <form className="panel" onSubmit={submit}><h2>Gửi yêu cầu tư vấn</h2><div className="form-grid">
      {contactFields.map(([name, label, type, maxLength, required, autoComplete]) => <label key={name}>{label}{required && ' *'}
        <input {...{ name, type, maxLength, required, autoComplete }} /></label>)}
      <label className="wide">Nội dung yêu cầu *<textarea name="message" rows="5" minLength={10} maxLength={3000} required /></label>
    </div><button className="button primary" disabled={status.busy}>{status.busy ? 'Đang gửi…' : 'Gửi yêu cầu'} <Send size={16} /></button>
    {status.ok && <p className="notice success" role="status">Platinum đã nhận được yêu cầu của bạn.</p>}
    {status.error && <p className="notice error" role="alert">{status.error}</p>}</form>
  </section>;
}
function Chat({ open, onClose }) {
  const dialog = useRef();
  const input = useRef();
  const log = useRef();
  const busyRef = useRef(false);
  const [history, setHistory] = useState([]);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (open && !dialog.current.open) { dialog.current.showModal(); input.current.focus(); }
    if (!open && dialog.current.open) dialog.current.close();
  }, [open]);
  useEffect(() => { if (open) log.current.scrollTop = log.current.scrollHeight; }, [history, busy, open]);
  async function ask(question) {
    if (!question || busyRef.current) return;
    busyRef.current = true;
    input.current.value = '';
    setBusy(true);
    setHistory(items => [...items, { question }]);
    try {
      const response = await api('/chat', { method: 'POST', body: { question } });
      setHistory(items => [...items, response]);
    } catch (error) { setHistory(items => [...items, { error: error.message }]); }
    finally { busyRef.current = false; setBusy(false); }
  }
  return <dialog ref={dialog} className="chat" aria-labelledby="chat-title" onCancel={onClose} onClose={onClose}>
    <div className="chat-header"><Bot size={23} /><h2 id="chat-title">Trợ lý Platinum</h2>
      <button className="icon-button" onClick={onClose} aria-label="Đóng chat"><X /></button></div>
    <div className="chat-log" ref={log} role="log" aria-live="polite">
      {history.length === 0 && <><p className="bubble">Bạn muốn tìm hiểu gì về Platinum Technology?</p><div className="suggestions">
        {['Platinum có những dịch vụ nào?', 'Platinum hoạt động ở đâu?'].map(question => <button key={question} onClick={() => ask(question)}>{question}</button>)}
      </div></>}
      {history.map((item, index) => <div className={'bubble' + (item.question ? ' question' : '')} key={index}>
        {item.question || item.answer || item.error}
        {item.sources?.length > 0 && <ul>{item.sources.map(source => <li key={source.url}><Link onClick={onClose} to={source.url}>{source.title}</Link></li>)}</ul>}
        {(item.error || item.sources?.length === 0) && <p className="chat-links"><Link onClick={onClose} to="/hoi-dap">Hỏi đáp</Link><Link onClick={onClose} to="/lien-he">Liên hệ</Link></p>}
      </div>)}
      {busy && <p className="bubble">Đang tra cứu…</p>}
    </div>
    <form onSubmit={event => { event.preventDefault(); ask(input.current.value.trim()); }} className="chat-form">
      <input ref={input} aria-label="Câu hỏi về Platinum" placeholder="Nhập câu hỏi…" maxLength={500} required />
      <button className="button primary" aria-label="Gửi câu hỏi" disabled={busy}><Send size={17} /></button>
    </form>
  </dialog>;
}
function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();
  const motionRoot = useScrollReveal(location.pathname);
  const { data: projects } = useData('/content/projects', location.pathname);
  useEffect(() => { if (!location.hash) window.scrollTo(0, 0); }, [location.pathname, location.hash]);
  const onChat = () => setChatOpen(true);
  return <><a href="#main" className="skip">Đến nội dung chính</a><Header projects={projects?.length} onChat={onChat} />
    <main id="main" ref={motionRoot}><div key={location.pathname} className="route-content"><Routes>
      <Route path="/" element={<Home onChat={onChat} />} />
      <Route path="/gioi-thieu" element={<About />} />
      <Route path="/lien-he" element={<Contact />} />
      <Route path="/hoi-dap" element={<Faq />} />
      <Route path="/quan-tri" element={<><Meta title="Quản trị" /><Admin /></>} />
      {Object.entries(category).map(([group, [url]]) => <React.Fragment key={group}>
        <Route path={'/' + url} element={<Listing group={group} />} />
        <Route path={'/' + url + '/:slug'} element={<Detail group={group} />} />
      </React.Fragment>)}
      <Route path="/:slug" element={<Detail group="pages" />} />
      <Route path="*" element={<Status missing />} />
    </Routes></div></main><Footer projects={projects?.length} refreshKey={location.pathname} />
    <button className="chat-launch button primary" onClick={onChat}><Sparkles size={18} /> <span>Hỏi AI</span></button>
    <Chat open={chatOpen} onClose={() => setChatOpen(false)} />
  </>;
}
createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>);
