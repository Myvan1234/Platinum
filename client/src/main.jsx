import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Bot, Boxes, BriefcaseBusiness, Building2, ChevronRight, Cloud, Code2, Cpu, GraduationCap, Layers3, MapPin, Menu, MessagesSquare, Monitor, Send, Sparkles, Workflow, X } from 'lucide-react';
import { api } from './api.js';
import Admin from './admin.jsx';
import { useScrollReveal, CatalogCount } from './scroll-effects.jsx';
import './style.css';
import './presentation.css';
import './motion.css';
import './enterprise.css';
import './inner-pages.css';

const company = 'Platinum Technology';
const CatalogContext = createContext(null);
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
    if (path) api(path, { signal: abort.signal }).then(data => { if (!abort.signal.aborted) setState({ path, data }); })
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
    <picture className="brand-logo">
      <source media="(max-width: 520px)" srcSet="/brand/pt-mark-clear.png" />
      <img src="/brand/platinum-wordmark-clear.png" alt="" />
    </picture>
    <span className="brand-mobile-name">Platinum Technology</span>
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
function FooterCatalog({ group }) {
  const { data } = useContext(CatalogContext)[group];
  const [slug, title] = category[group];
  const base = '/' + slug;
  return <div className="footer-column">
    <h2><Link to={base}>{title}</Link></h2>
    {!!data?.length && <ul>{data.map(entry =>
      <li key={entry.slug}><Link to={base + '/' + entry.slug}>{entry.title}</Link></li>)}</ul>}
  </div>;
}

function Footer({ projects }) {
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
          <FooterCatalog group="services" />
          <FooterCatalog group="products" />
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
function PageBanner({ title, description, Icon }) {
  return <section className="inner-banner"><div className="shell">
    <nav className="breadcrumbs" aria-label="Đường dẫn trang">
      <Link to="/">Trang chủ</Link><ChevronRight size={15} aria-hidden="true" />
      <span aria-current="page">{title}</span>
    </nav>
    <div className="inner-banner-title">
      <div><h1>{title}</h1>{description && <p className="lead">{description}</p>}</div>
      {Icon && <span className="inner-banner-icon"><Icon size={42} strokeWidth={1.4} aria-hidden="true" /></span>}
    </div>
  </div></section>;
}

function Listing({ group, home = false }) {
  const { data, error } = useContext(CatalogContext)[group];
  const [url, title] = category[group];
  if (home && !data?.length) return null;
  const Icon = group === 'services' ? Layers3 : group === 'products' ? Boxes : BriefcaseBusiness;
  if (!home) return <>
    <Meta title={title} description={categoryCopy[group]} />
    <PageBanner title={title} description={categoryCopy[group]} Icon={Icon} />
    <section className={'inner-catalog catalog catalog-' + group}>
      <div className="shell section">
        {data?.length ? <div className={group === 'products' ? 'product-layout' : undefined}>
          {group === 'products' && <div className="product-visual" data-scroll-reveal aria-hidden="true" />}
          <Cards entries={data} group={group} heading="h2" />
        </div> : data ? <div className="inner-empty">
          <span className="tile"><Icon size={24} aria-hidden="true" /></span>
          <h2>Nội dung đang được cập nhật</h2>
          <Link className="back" to="/lien-he">Liên hệ Platinum <ArrowRight size={16} aria-hidden="true" /></Link>
        </div> : <Status error={error} />}
      </div>
    </section>
  </>;
  return <section className={'catalog catalog-' + group + ' catalog-home'} id={url}>
    <div className="shell section">

      <div className="section-title catalog-heading" data-scroll-reveal>
        <div><CatalogCount key={data.length} count={data.length} label={title.toLowerCase()} />
          <h2>{title}</h2><p>{categoryCopy[group]}</p></div>
        <Link to={'/' + url}>Xem tất cả <ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
      <div className={group === 'products' ? 'product-layout' : undefined}>
        {group === 'products' && <div className="product-visual" data-scroll-reveal aria-hidden="true" />}
        <Cards entries={data} group={group} />
      </div>
    </div>
  </section>;
}
function Home({ onChat }) {
  const { data, error } = useData('/content/pages/trang-chu');
  const about = useData('/content/pages/gioi-thieu');
  return <><Meta description={data?.summary} />
    <section className="hero enterprise-hero"><div className="shell hero-grid">
      <div className="hero-copy">{data ? <><p className="eyebrow"><span /> PLATINUM TECHNOLOGY</p><div className="hero-title-mask"><h1>{data.title}</h1></div><p>{data.summary}</p></> : <Status error={error} />}
        <div className="actions"><Link className="button primary" to="/lien-he">Trao đổi nhu cầu <ArrowRight size={18} aria-hidden="true" /></Link>
          <button className="button hero-alt" onClick={onChat}><Sparkles size={17} aria-hidden="true" /> Hỏi AI về Platinum</button></div>
      </div>
      <div className="hero-art" aria-hidden="true" />
    </div></section>
    <section className="shell enterprise-ai" aria-labelledby="home-ai-title">
      <div className="enterprise-ai-title"><span className="tile"><Sparkles size={21} aria-hidden="true" /></span>
        <h2 id="home-ai-title">Khám phá Platinum cùng AI</h2></div>
      <div className="enterprise-ai-questions">
        {['Platinum có những dịch vụ nào?', 'Platinum có những sản phẩm nào?', 'Platinum hoạt động ở đâu?'].map(question =>
          <button key={question} type="button" onClick={() => onChat(question)}>{question}<ArrowUpRight size={15} aria-hidden="true" /></button>)}
      </div>
    </section>
    {about.data?.body && <section className="shell enterprise-overview" data-scroll-reveal>
      <h2>Về Platinum Technology</h2>
      <div><p className="body-text">{about.data.body.split(/\n{2,}/)[0]}</p>
        <Link className="back" to="/gioi-thieu">Tìm hiểu về Platinum <ArrowRight size={17} aria-hidden="true" /></Link></div>
    </section>}
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
  const { services } = useContext(CatalogContext);
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
        <div className="about-visual"><img src="/brand/platinum-wordmark-clear.png" alt="Logo Platinum Technology" width="960" height="320" /></div>
      </div>
    </div></section>

    {data.body && <section className="shell about-overview" aria-labelledby="about-overview-title" data-scroll-reveal>
      <div className="about-overview-card">
        <div className="about-overview-heading">
          <span className="about-overview-icon"><Building2 size={29} strokeWidth={1.6} aria-hidden="true" /></span>
          <h2 id="about-overview-title">Tổng quan doanh nghiệp</h2>
          {!!services.data?.length && <a href="#linh-vuc-cong-nghe">Khám phá lĩnh vực công nghệ <ArrowRight size={17} aria-hidden="true" /></a>}
        </div>
        <div className="about-prose"><Paragraphs text={data.body} /></div>
      </div>
    </section>}

    {extraSections.length > 0 && <div className="shell about-extras">
      {extraSections.map(entry => <section className="about-info" data-scroll-reveal id={entry.slug} key={entry.slug}>
        <h2>{entry.title}</h2>
        {entry.summary && <p className="lead">{entry.summary}</p>}
        <Paragraphs text={entry.body} />
      </section>)}
    </div>}

    {!!services.data?.length && <section className="about-expertise" id="linh-vuc-cong-nghe"><div className="shell">
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
  const related = useContext(CatalogContext)[group]?.data?.filter(entry => entry.slug !== slug).slice(0, 4) || [];
  if (!data) return <Status error={error} />;
  const Icon = entryIcons[data.slug] || (group === 'projects' ? BriefcaseBusiness : Layers3);
  const productNeedsDetails = group === 'products' && !data.summary && !data.body;
  const detailTitles = { services: 'Thông tin dịch vụ', products: 'Thông tin sản phẩm', projects: 'Thông tin dự án' };
  return <article className="detail-page"><Meta title={data.title} description={data.summary} />
    <div className="detail-banner"><div className="shell detail-inner">
      <nav aria-label="Đường dẫn trang" className="breadcrumbs"><Link to="/">Trang chủ</Link>
        {category[group] && <><ChevronRight size={15} aria-hidden="true" /><Link to={'/' + category[group][0]}>{category[group][1]}</Link></>}
        <ChevronRight size={15} aria-hidden="true" /><span aria-current="page">{data.title}</span>
      </nav>
      <div className="detail-head"><span className="tile"><Icon size={33} strokeWidth={1.6} aria-hidden="true" /></span>
        <div><h1>{data.title}</h1>{data.summary && <p className="lead">{data.summary}</p>}</div></div>
    </div></div>
    <div className="shell detail-inner detail-content inner-detail-grid">
      {(data.body || productNeedsDetails) && <section className="inner-detail-copy" aria-labelledby="detail-copy-title" data-scroll-reveal>
        <h2 id="detail-copy-title">{detailTitles[group] || 'Thông tin chi tiết'}</h2>
        {productNeedsDetails && <p className="body-text">Để tìm hiểu thêm về {data.title}, hãy gửi câu hỏi qua biểu mẫu liên hệ.</p>}
        <Paragraphs text={data.body} />
      </section>}
      <aside className="inner-aside">
        <div className="inner-support"><h2>Trao đổi với Platinum</h2>
          <Link to="/lien-he" className="button primary">Trao đổi nhu cầu <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        {!!related.length && <nav aria-label="Nội dung cùng danh mục" className="inner-related">
          <h2>Cùng danh mục</h2>
          {related.map(entry => <Link key={entry.slug} to={'/' + category[group][0] + '/' + entry.slug}>
            {entry.title}<ChevronRight size={16} aria-hidden="true" />
          </Link>)}
        </nav>}
      </aside>
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
  return <><Meta title="Hỏi đáp" />
    <PageBanner title="Hỏi đáp về Platinum" description="Tìm hiểu về công ty, dịch vụ, sản phẩm và cách gửi yêu cầu hợp tác." Icon={MessagesSquare} />
    <section className="shell section inner-faq"><div>
    {data ? data.map(item => <details data-scroll-reveal key={item.slug} id={item.slug}><summary>{item.title}<ChevronRight size={18} aria-hidden="true" /></summary>
      <p>{item.summary}</p>{item.slug === "gui-yeu-cau" && <p><Link className="back" to="/lien-he">Mở trang Liên hệ</Link></p>}{item.body && <p className="body-text">{item.body}</p>}</details>) : <Status error={error} />}
    </div><aside className="inner-aside"><div className="inner-support">
      <h2>Bạn có câu hỏi khác?</h2><Link className="button primary" to="/lien-he">Gửi câu hỏi <ArrowRight size={16} aria-hidden="true" /></Link>
    </div></aside></section></>;
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
  return <><Meta title="Liên hệ" description={data?.summary} />
    <PageBanner title={data?.title || 'Liên hệ Platinum'} description={data?.summary} Icon={MessagesSquare} />
    <section className="shell section contact-layout">
      <div className="contact-intro"><h2>Thông tin liên hệ</h2>
        {data?.body ? <Paragraphs text={data.body} /> : !data && error?.status !== 404 && <Status error={error} />}
        <Link className="back" to="/hoi-dap">Xem câu hỏi thường gặp <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    <form className="panel" onSubmit={submit}><h2>Gửi yêu cầu tư vấn</h2><div className="form-grid">
      {contactFields.map(([name, label, type, maxLength, required, autoComplete]) => <label key={name}>{label}{required && ' *'}
        <input {...{ name, type, maxLength, required, autoComplete }} /></label>)}
      <label className="wide">Nội dung yêu cầu *<textarea name="message" rows="5" minLength={10} maxLength={3000} required /></label>
    </div><button className="button primary" disabled={status.busy}>{status.busy ? 'Đang gửi…' : 'Gửi yêu cầu'} <Send size={16} /></button>
    {status.ok && <p className="notice success" role="status">Platinum đã nhận được yêu cầu của bạn.</p>}
    {status.error && <p className="notice error" role="alert">{status.error}</p>}</form>
  </section></>;
}
function Chat({ open, onClose, seed }) {
  const dialog = useRef();
  const input = useRef();
  const log = useRef();
  const busyRef = useRef(false);
  const [history, setHistory] = useState([]);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (open && !dialog.current.open) { input.current.value = seed; dialog.current.showModal(); input.current.focus(); }
    if (!open && dialog.current.open) dialog.current.close();
  }, [open, seed]);
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
      {history.length === 0 && <><p className="bubble">Bạn có thể hỏi về Platinum hoặc các chủ đề khác, chẳng hạn ẩm thực, học tập và công nghệ.</p><div className="suggestions">
        {['Platinum có những dịch vụ nào?', 'Huế có món gì nổi bật?'].map(question => <button key={question} onClick={() => ask(question)}>{question}</button>)}
      </div></>}
      {history.map((item, index) => <div className={'bubble' + (item.question ? ' question' : '')} key={index}>
        {item.question || item.answer || item.error}
        {item.scope === 'general' && <p className="chat-scope">Kiến thức chung</p>}
        {item.sources?.length > 0 && <ul>{item.sources.map(source => <li key={source.url}><Link onClick={onClose} to={source.url}>{source.title}</Link></li>)}</ul>}
        {(item.error || item.scope === 'unknown') && <p className="chat-links"><Link onClick={onClose} to="/hoi-dap">Hỏi đáp</Link><Link onClick={onClose} to="/lien-he">Liên hệ</Link></p>}
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
  const [chatSeed, setChatSeed] = useState('');
  const location = useLocation();
  const motionRoot = useScrollReveal(location.pathname);
  const inAdmin = location.pathname === '/quan-tri';
  const services = useData('/content/services', inAdmin);
  const products = useData('/content/products', inAdmin);
  const projects = useData('/content/projects', inAdmin);
  useEffect(() => { if (!location.hash) window.scrollTo(0, 0); }, [location.pathname, location.hash]);
  const onChat = question => {
    setChatSeed(typeof question === 'string' ? question : '');
    setChatOpen(true);
  };
  return <CatalogContext.Provider value={{ services, products, projects }}><a href="#main" className="skip">Đến nội dung chính</a><Header projects={projects.data?.length} onChat={onChat} />
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
    </Routes></div></main><Footer projects={projects.data?.length} />
    <button className="chat-launch button primary" onClick={onChat}><Sparkles size={18} /> <span>Hỏi AI</span></button>
    <Chat seed={chatSeed} open={chatOpen} onClose={() => setChatOpen(false)} />
  </CatalogContext.Provider>;
}
createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>);
