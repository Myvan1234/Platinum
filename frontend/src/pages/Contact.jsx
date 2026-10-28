import { createContext, useContext, useState } from "react";
import { sendContact } from "../api.js";
import { Page, Head, services } from "../components/Shared";

const EMPTY = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
  consent: false,
  website: "",
};

function validate(f) {
  const e = {};
  if (f.fullName.trim().length < 2) e.fullName = "Vui lòng nhập họ và tên.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Email không hợp lệ.";
  if (!/^[0-9+\s().-]{8,20}$/.test(f.phone))
    e.phone = "Số điện thoại không hợp lệ.";
  if (f.message.trim().length < 10) e.message = "Nội dung tối thiểu 10 ký tự.";
  if (!f.consent) e.consent = "Cần đồng ý chính sách xử lý dữ liệu.";
  return e;
}

const FormCtx = createContext(null);

function F({ k, label, type = "text", req, children }) {
  const { f, err, set } = useContext(FormCtx);
  return (
    <div className={`field ${err[k] ? "has-error" : ""}`}>
      <label htmlFor={k}>
        {label}
        {req && <span className="req">*</span>}
      </label>
      {children || (
        <input
          id={k}
          type={type}
          value={f[k]}
          onChange={set(k)}
          aria-invalid={!!err[k]}
          maxLength={150}
        />
      )}
      {err[k] && (
        <span className="err-msg" role="alert">
          {err[k]}
        </span>
      )}
    </div>
  );
}

export function Contact() {
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [st, setSt] = useState({ s: "idle", m: "" });

  const set = (k) => (ev) =>
    setF({
      ...f,
      [k]: ev.target.type === "checkbox" ? ev.target.checked : ev.target.value,
    });

  async function submit(ev) {
    ev.preventDefault();
    if (st.s === "loading") return;
    const e = validate(f);
    setErr(e);
    if (Object.keys(e).length) return;
    setSt({ s: "loading", m: "" });
    try {
      await sendContact(f);
      setSt({
        s: "ok",
        m: "Đã mở ứng dụng email với nội dung yêu cầu. Vui lòng bấm Gửi trong ứng dụng email để hoàn tất, hoặc gọi trực tiếp (+84) 0948 496 749.",
      });
      setF(EMPTY);
    } catch (x) {
      if (x.fields) setErr(x.fields);
      setSt({ s: "fail", m: x.message });
    }
  }

  return (
    <Page
      title="Liên hệ"
      desc="Liên hệ Platinum Technology tại Huế và Đà Nẵng để nhận tư vấn và báo giá chi tiết."
      crumbs={[
        ["/", "Trang chủ"],
        [null, "Liên hệ"],
      ]}
    >
      <Head
        h="Liên hệ tư vấn"
        p="Trao đổi trực tiếp về giải pháp phần mềm, chuyển đổi số & AI cho doanh nghiệp của bạn."
      />

      <section className="sec">
        <div className="wrap contact-layout">
          {/* CỘT TRÁI: THÔNG TIN LIÊN HỆ & VĂN PHÒNG */}
          <div className="contact-info-col">
            <div className="contact-header-text">
              <h2>Trò chuyện cùng chuyên gia</h2>
              <p>
                Đội ngũ Platinum Technology sẵn sàng lắng nghe bài toán và đưa
                ra tư vấn phù hợp nhất với ngân sách của doanh nghiệp.
              </p>
            </div>

            <div className="contact-cards-list">
              {/* Thẻ Trụ sở Huế */}
              <div className="c-info-card">
                <div className="c-icon-box">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="c-info-body">
                  <span className="c-tag">Trụ sở chính</span>
                  <h4>Văn phòng Huế</h4>
                  <p>Lô E1-28, Đường Số 2, KĐT Phú Mỹ An, P. An Cựu</p>
                </div>
              </div>

              {/* Thẻ Chi nhánh Đà Nẵng */}
              <div className="c-info-card">
                <div className="c-icon-box branch">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="c-info-body">
                  <span className="c-tag branch">Chi nhánh</span>
                  <h4>Văn phòng Đà Nẵng</h4>
                  <p>179 Trần Hưng Đạo, P. An Hải</p>
                </div>
              </div>

              {/* Thẻ Kênh liên hệ trực tiếp */}
              <div className="c-info-card direct">
                <div className="c-direct-grid">
                  <a href="tel:+84948496749" className="c-direct-item">
                    <div className="c-mini-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <small>Hotline 24/7</small>
                      <strong>(+84) 0948 496 749</strong>
                    </div>
                  </a>

                  <a
                    href="mailto:contact@platinumtechnology.net"
                    className="c-direct-item"
                  >
                    <div className="c-mini-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <small>Email nhận tư vấn</small>
                      <strong>contact@platinumtechnology.net</strong>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: FORM GỬI YÊU CẦU */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h3>Gửi yêu cầu tư vấn</h3>
              <p className="form-subtext">
                Điền thông tin bên dưới, chúng tôi sẽ liên hệ phản hồi trong
                vòng 24 giờ làm việc.
              </p>

              <FormCtx.Provider value={{ f, err, set }}>
                <form onSubmit={submit} noValidate className="c-form">
                  <div className="form-row-2">
                    <F k="fullName" label="Họ và tên" req />
                    <F k="company" label="Tên doanh nghiệp" />
                  </div>

                  <div className="form-row-2">
                    <F k="email" label="Email" type="email" req />
                    <F k="phone" label="Số điện thoại" type="tel" req />
                  </div>

                  <F k="service" label="Dịch vụ quan tâm">
                    <select
                      id="service"
                      value={f.service}
                      onChange={set("service")}
                    >
                      <option value="">Chọn dịch vụ bạn đang cần</option>
                      {services.map((s) => (
                        <option key={s.slug}>{s.name}</option>
                      ))}
                    </select>
                  </F>

                  <F k="budget" label="Ngân sách dự kiến (không bắt buộc)" />

                  <F k="message" label="Nội dung yêu cầu" req>
                    <textarea
                      id="message"
                      rows="4"
                      placeholder="Mô tả sơ lược bài toán hoặc nhu cầu phần mềm của bạn..."
                      value={f.message}
                      onChange={set("message")}
                      maxLength={3000}
                      aria-invalid={!!err.message}
                    />
                  </F>

                  {/* Honeypot field (bảo mật ẩn) */}
                  <div
                    className="hp"
                    aria-hidden="true"
                    style={{ display: "none" }}
                  >
                    <label>
                      Website
                      <input
                        tabIndex="-1"
                        autoComplete="off"
                        value={f.website}
                        onChange={set("website")}
                      />
                    </label>
                  </div>

                  <div className="field-consent">
                    <label className="check-label">
                      <input
                        type="checkbox"
                        checked={f.consent}
                        onChange={set("consent")}
                      />
                      <span>
                        Tôi đồng ý để Platinum Technology lưu trữ và xử lý thông
                        tin này nhằm mục đích phản hồi yêu cầu. *
                      </span>
                    </label>
                    {err.consent && (
                      <span className="err-msg block" role="alert">
                        {err.consent}
                      </span>
                    )}
                  </div>

                  <button className="btn-submit" disabled={st.s === "loading"}>
                    {st.s === "loading" ? (
                      <span className="btn-loading">Đang xử lý...</span>
                    ) : (
                      <>
                        <span>Gửi yêu cầu tư vấn</span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          width="18"
                          height="18"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </>
                    )}
                  </button>

                  {st.m && (
                    <div
                      role="status"
                      className={`status-alert ${st.s === "ok" ? "success" : "error"}`}
                    >
                      <span className="alert-icon">
                        {st.s === "ok" ? "✓" : "✕"}
                      </span>
                      <p>{st.m}</p>
                    </div>
                  )}
                </form>
              </FormCtx.Provider>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
