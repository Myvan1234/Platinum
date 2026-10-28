import { useEffect } from "react";
import { Link } from "react-router-dom";

import contentData from "../../../shared/content.json";

const content = contentData || {};

export const services = content.services || [];
export const products = content.products || [];
export const projects = content.projects || [];
export const steps = content.process || [];
export const tech = content.tech || [];

export function Page({ title, desc, children, crumbs }) {
  useEffect(() => {
    document.title = `${title} | Platinum Technology`;
    let m = document.querySelector("meta[name=description]");
    if (m) m.setAttribute("content", desc);
  }, [title, desc]);

  return (
    <>
      {crumbs && (
        <nav className="wrap crumbs" aria-label="Breadcrumb">
          {crumbs.map(([to, t]) =>
            to ? (
              <span key={t}>
                <Link to={to}>{t}</Link> /{" "}
              </span>
            ) : (
              <span key={t} aria-current="page">
                {t}
              </span>
            ),
          )}
        </nav>
      )}
      {children}
    </>
  );
}

export const Head = ({ h, p }) => (
  <header className="phead">
    <div className="wrap">
      <h1>{h}</h1>
      {p && <p className="lead">{p}</p>}
    </div>
  </header>
);

export const SecHead = ({ h, to, link }) => (
  <div className="sechead">
    <h2>{h}</h2>
    {to && (
      <Link to={to} className="more">
        {link}
      </Link>
    )}
  </div>
);

export const Cta = ({ text = "Bạn đang có một bài toán cần giải quyết?" }) => (
  <section className="cta">
    <div className="wrap">
      <h2>{text}</h2>
      <Link to="/lien-he" className="btn">
        Yêu cầu tư vấn
      </Link>
    </div>
  </section>
);

export const List = ({ items = [] }) => (
  <ul className="ticks">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

export const svcRows = (l = []) =>
  l.map((s) => ({
    key: s.slug,
    to: `/dich-vu/${s.slug}`,
    meta: s.category,
    title: s.name,
    text: s.summary,
  }));

export const prjRows = (l = []) =>
  l.map((p) => ({
    key: p.slug,
    to: `/du-an/${p.slug}`,
    meta: p.category,
    title: p.name,
    text: p.summary,
  }));

export const RowList = ({ items = [] }) => (
  <ul className="rows">
    {items.map((i) => (
      <li key={i.key}>
        <Link to={i.to} className="rowlink">
          <span className="r-meta">{i.meta}</span>
          <span className="r-main">
            <strong>{i.title}</strong>
            <span>{i.text}</span>
          </span>
          <span className="r-go" aria-hidden="true" />
        </Link>
      </li>
    ))}
  </ul>
);

// Thẻ hiển thị Sản phẩm
export const Panels = () => (
  <div className="panels">
    {products.map((p) => (
      <article key={p.slug} className="pcard">
        <h3>{p.name}</h3>
        <p>{p.summary}</p>
        <ul className="chips">
          {p.features?.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <Link to={`/lien-he?ref=${p.slug}`} className="more">
          Liên hệ tìm hiểu
        </Link>
      </article>
    ))}
  </div>
);

export const ProjectGrid = ({ items = [] }) => (
  <div className="prj-grid">
    {items.map((p) => (
      <Link key={p.slug} to={`/du-an/${p.slug}`} className="prj-card">
        <div className="prj-header">
          <span className="prj-badge">{p.category}</span>
          <span className="prj-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="prj-body">
          <h3 className="prj-title">{p.name}</h3>
          <p className="prj-desc">{p.summary}</p>
        </div>
      </Link>
    ))}
  </div>
);

export const getTechLogo = (name) => {
  if (!name) return "";
  const key = name.toLowerCase().trim();
  const map = {
    "asp.net core 8": "dotnetcore/dotnetcore-original.svg",
    "asp.net": "dotnetcore/dotnetcore-original.svg",
    "c#": "csharp/csharp-original.svg",
    "react native": "react/react-original.svg",
    react: "react/react-original.svg",
    reactjs: "react/react-original.svg",
    "next.js": "nextjs/nextjs-original.svg",
    nestjs: "nestjs/nestjs-original.svg",
    "node.js": "nodejs/nodejs-original.svg",
    postgresql: "postgresql/postgresql-original.svg",
    "sql server": "microsoftsqlserver/microsoftsqlserver-plain.svg",
    mysql: "mysql/mysql-original.svg",
    kubernetes: "kubernetes/kubernetes-plain.svg",
    docker: "docker/docker-original.svg",
    aws: "amazonwebservices/amazonwebservices-original-wordmark.svg",
    azure: "azure/azure-original.svg",
    "ai agent": "python/python-original.svg",
    python: "python/python-original.svg",
    javascript: "javascript/javascript-original.svg",
    typescript: "typescript/typescript-original.svg",
    html: "html5/html5-original.svg",
    css: "css3/css3-original.svg",
    git: "git/git-original.svg",
    figma: "figma/figma-original.svg",
  };

  if (map[key]) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${map[key]}`;
  }
  return "https://api.iconify.design/lucide:cpu.svg?color=%2394A3B8";
};
