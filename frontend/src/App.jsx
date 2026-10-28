import { useEffect, useState } from "react";
import { Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import {
  Home,
  About,
  Services,
  ServiceDetail,
  Products,
  Projects,
  ProjectDetail,
  Tech,
  Process,
  Contact,
  NotFound,
} from "./pages.jsx";

const NAV = [
  ["/ve-chung-toi", "Về chúng tôi"],
  ["/dich-vu", "Dịch vụ"],
  ["/san-pham", "Sản phẩm"],
  ["/du-an", "Dự án"],
  ["/cong-nghe", "Công nghệ"],
  ["/quy-trinh", "Quy trình"],
];

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Platinum Technology – Trang chủ">
      <span className="logo-mark">pt</span>
      <span>Platinum Technology</span>
    </Link>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const f = () => setTop(window.scrollY > 600);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      <a href="#main" className="skip">
        Bỏ qua đến nội dung
      </a>

      <header className="header">
        <div className="wrap bar">
          <Logo />
          <button
            className="burger"
            aria-expanded={open}
            aria-controls="nav"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Đóng menu" : "Mở menu"}
          >
            <span aria-hidden="true"></span>
          </button>
          <nav
            id="nav"
            className={open ? "nav open" : "nav"}
            aria-label="Điều hướng chính"
          >
            {NAV.map(([to, t]) => (
              <NavLink key={to} to={to}>
                {t}
              </NavLink>
            ))}
            <Link to="/lien-he" className="btn btn-sm">
              Trao đổi dự án
            </Link>
          </nav>
        </div>
      </header>

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ve-chung-toi" element={<About />} />
          <Route path="/dich-vu" element={<Services />} />
          <Route path="/dich-vu/:slug" element={<ServiceDetail />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/du-an" element={<Projects />} />
          <Route path="/du-an/:slug" element={<ProjectDetail />} />
          <Route path="/cong-nghe" element={<Tech />} />
          <Route path="/quy-trinh" element={<Process />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="wrap fgrid">
          <div className="f-col brand-col">
            <Logo />
            <p className="f-desc">
              <strong>Công ty TNHH Công nghệ Platinum</strong>
              Đồng hành cùng doanh nghiệp trong phát triển phần mềm, ứng dụng AI
              và chuyển đổi số.
            </p>
            <div className="f-tax">
              <span>Mã số thuế:</span> <strong>3301719812</strong>
            </div>
          </div>

          <div className="f-col">
            <h3>Văn phòng</h3>
            <div className="f-office">
              <strong>Trụ sở chính</strong>
              <p>Lô E1-28, Đường Số 2, KĐT Phú Mỹ An, An Cựu, Huế</p>
            </div>
            <div className="f-office">
              <strong>Chi nhánh</strong>
              <p>179 Trần Hưng Đạo, An Hải, Đà Nẵng</p>
            </div>
          </div>

          <div className="f-col">
            <h3>Liên hệ</h3>
            <div className="f-contact">
              <a href="tel:+84948496749">
                <span className="f-icon">☏</span>
                (+84) 0948 496 749
              </a>
              <a href="mailto:contact@platinumtechnology.net">
                <span className="f-icon">✉</span>
                contact@platinumtechnology.net
              </a>
              <a
                href="https://www.platinumtechnology.net"
                target="_blank"
                rel="noreferrer"
              >
                <span className="f-icon">🌐</span>
                www.platinumtechnology.net
              </a>
            </div>
          </div>
        </div>

        <div className="wrap copy">
          <p>
            © 2023–{new Date().getFullYear()} Platinum Technology. All rights
            reserved.
          </p>
          <p className="slogan-mini">Tiên phong & Chất lượng</p>
        </div>
      </footer>

      {top && (
        <button
          className="totop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Về đầu trang"
        >
          ↑
        </button>
      )}
    </>
  );
}
