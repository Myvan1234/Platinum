import { Page, Head, Cta } from "../components/Shared";

export function About() {
  const coreValues = [
    {
      num: "01",
      title: "Tiên phong",
      desc: "Đón đầu xu hướng công nghệ mới và ứng dụng AI thực tiễn vào sản phẩm.",
    },
    {
      num: "02",
      title: "Chất lượng",
      desc: "Cam kết chuẩn mực cao nhất trong từng kiến trúc phần mềm và dòng code.",
    },
    {
      num: "03",
      title: "Tận tâm",
      desc: "Đặt sự thành công và hài lòng bền vững của khách hàng làm trọng tâm.",
    },
    {
      num: "04",
      title: "Tư vấn chuyên sâu",
      desc: "Đưa ra giải pháp tối ưu phù hợp nhất với nguồn lực và bài toán thực tế.",
    },
    {
      num: "05",
      title: "Quan hệ bền vững",
      desc: "Xây dựng niềm tin dài hạn cùng đối tác, khách hàng và cộng đồng.",
    },
  ];

  return (
    <Page
      title="Về chúng tôi"
      desc="Giới thiệu Công ty TNHH Công nghệ Platinum – Platinum Technology, thành lập năm 2023."
      crumbs={[
        ["/", "Trang chủ"],
        [null, "Về chúng tôi"],
      ]}
    >
      <Head h="Về Platinum Technology" p="Tiên phong & Chất lượng" />

      {/* 1. Giới thiệu tổng quan */}
      <section className="sec">
        <div className="wrap">
          <div className="about-hero-card">
            <span className="about-badge">Hồ sơ năng lực</span>
            <h2>Kiến tạo giải pháp công nghệ bứt phá cho doanh nghiệp</h2>
            <p className="lead-text">
              Công ty TNHH Công nghệ Platinum (thương hiệu Platinum Technology)
              được thành lập năm 2023. Chúng tôi đồng hành cùng doanh nghiệp SME
              và các tổ chức trong hành trình phát triển phần mềm, ứng dụng trí
              tuệ nhân tạo (AI) và chuyển đổi số toàn diện.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Giá trị cốt lõi dạng Grid */}
      <section className="sec alt">
        <div className="wrap">
          <div className="sechead">
            <h2>Giá trị cốt lõi</h2>
            <span className="more-static">Kim chỉ nam hoạt động</span>
          </div>
          <div className="values-grid">
            {coreValues.map((v) => (
              <div key={v.num} className="value-card">
                <span className="val-num">{v.num}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Ban lãnh đạo */}
      <section className="sec">
        <div className="wrap">
          <div className="sechead">
            <h2>Ban lãnh đạo</h2>
          </div>
          <div className="leader-card">
            <div className="leader-avatar">
              <span>TT</span>
            </div>
            <div className="leader-info">
              <span className="leader-role">Founder & CEO</span>
              <h3>Trương Văn Trường</h3>
              <p>
                Người sáng lập và định hướng chiến lược phát triển cho Platinum
                Technology, dẫn dắt đội ngũ kỹ sư triển khai giải pháp phần mềm
                và AI thực tiễn cho doanh nghiệp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mạng lưới văn phòng */}
      <section className="sec alt">
        <div className="wrap">
          <div className="sechead">
            <h2>Mạng lưới văn phòng</h2>
          </div>
          <div className="offices-grid">
            {/* Văn phòng Huế - Trụ sở chính */}
            <div className="office-card main-office">
              <div className="office-card-header">
                <span className="office-badge primary">Trụ sở chính</span>
                <h3>Văn phòng Huế</h3>
              </div>
              <div className="office-info-list">
                <div className="office-info-item">
                  <div className="icon-box">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span>Lô E1-28, Đường Số 2, KĐT Phú Mỹ An, P. An Cựu</span>
                </div>
                <div className="office-info-item">
                  <div className="icon-box">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <a href="tel:+84948496749">(+84) 0948 496 749</a>
                </div>
                <div className="office-info-item">
                  <div className="icon-box">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <a href="mailto:contact@platinumtechnology.net">
                    contact@platinumtechnology.net
                  </a>
                </div>
              </div>
            </div>

            {/* Văn phòng Đà Nẵng - Chi nhánh */}
            <div className="office-card branch-office">
              <div className="office-card-header">
                <span className="office-badge secondary">Chi nhánh</span>
                <h3>Văn phòng Đà Nẵng</h3>
              </div>
              <div className="office-info-list">
                <div className="office-info-item">
                  <div className="icon-box">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span>179 Trần Hưng Đạo, P. An Hải</span>
                </div>
                <div className="office-info-item">
                  <div className="icon-box">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <a href="tel:+84948496749">(+84) 0948 496 749</a>
                </div>
                <div className="office-info-item">
                  <div className="icon-box">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <a href="mailto:contact@platinumtechnology.net">
                    contact@platinumtechnology.net
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </Page>
  );
}
