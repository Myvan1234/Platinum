import { Page, Head, Cta, steps } from "../components/Shared";

export function Process() {
  return (
    <Page
      title="Quy trình triển khai"
      desc="Quy trình 6 bước chuyên nghiệp từ khảo sát hệ thống đến báo cáo và nghiệm thu."
      crumbs={[
        ["/", "Trang chủ"],
        [null, "Quy trình"],
      ]}
    >
      <Head
        h="Quy trình triển khai"
        p="Chuyên nghiệp, minh bạch và tối ưu hiệu quả qua 6 bước tiêu chuẩn."
      />

      <section className="sec">
        <div className="wrap">
          <div className="process-timeline">
            {steps.map((x, idx) => (
              <div key={x.name} className="process-step-card">
                {/* Cột hiển thị số bước & đường nối */}
                <div className="step-badge-col">
                  <span className="step-number">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {idx < steps.length - 1 && <span className="step-line" />}
                </div>

                {/* Nội dung chi tiết bước */}
                <div className="step-content-col">
                  <div className="step-header">
                    <span className="step-tag">Bước {idx + 1}</span>
                    <h2 className="step-title">{x.name}</h2>
                  </div>
                  <p className="step-desc">{x.desc}</p>

                  <div className="step-meta-grid">
                    {/* Sản phẩm đầu ra */}
                    <div className="step-meta-box output-box">
                      <div className="meta-icon">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                      </div>
                      <div className="meta-info">
                        <strong>Sản phẩm đầu ra</strong>
                        <span>{x.output}</span>
                      </div>
                    </div>

                    {/* Phương thức phối hợp */}
                    <div className="step-meta-box duty-box">
                      <div className="meta-icon">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <div className="meta-info">
                        <strong>Phối hợp thực hiện</strong>
                        <span>{x.duty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta text="Bắt đầu triển khai dự án cùng Platinum Technology?" />
    </Page>
  );
}
