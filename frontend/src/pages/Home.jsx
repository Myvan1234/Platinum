import { Link } from "react-router-dom";
import {
  Page,
  SecHead,
  RowList,
  svcRows,
  Panels,
  ProjectGrid,
  Cta,
  services,
  projects,
  steps,
  tech,
} from "../components/Shared";

const techNames = tech.flatMap((g) => g.items).filter((x) => x.length < 24);

export function Home() {
  return (
    <Page
      title="Trang chủ"
      desc="Platinum Technology đồng hành cùng doanh nghiệp trong phát triển phần mềm, ứng dụng AI và chuyển đổi số."
    >
      <section
        className="hero"
        style={{ backgroundImage: "url('../images/anh-nen.jpg')" }}
      >
        <div className="wrap hero-grid">
          <div>
            <p className="slogan">Tiên phong & Chất lượng</p>
            <h1>Kiến tạo giải pháp số. Tối ưu vận hành doanh nghiệp.</h1>
            <p className="lead">
              Platinum Technology đồng hành cùng doanh nghiệp trong phát triển
              phần mềm, ứng dụng AI và chuyển đổi số bằng các giải pháp phù hợp
              với nhu cầu thực tế.
            </p>
            <div className="actions">
              <Link to="/lien-he" className="btn">
                Trao đổi dự án
              </Link>
              <Link to="/dich-vu" className="btn btn-ghost">
                Khám phá dịch vụ
              </Link>
            </div>
          </div>
          <aside className="panel" aria-label="Năng lực chính">
            <div className="panel-bar">
              <i />
              <i />
              <i />
              <span>platinum / năng lực</span>
            </div>
            <ul>
              {services.slice(0, 7).map((x) => (
                <li key={x.slug}>
                  <span>{x.name}</span>
                  <em>{x.category}</em>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead
            h="Dịch vụ tiêu biểu"
            to="/dich-vu"
            link="Xem đủ 10 dịch vụ"
          />
          <RowList items={svcRows(services.slice(0, 6))} />
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap about">
          <div>
            <h2>Một đội ngũ công nghệ đến từ miền Trung</h2>
            <p>
              Công ty TNHH Công nghệ Platinum thành lập năm 2023, phục vụ doanh
              nghiệp SME và tổ chức cần phát triển phần mềm, chuyển đổi số và
              ứng dụng AI.
            </p>
            <Link to="/ve-chung-toi" className="btn btn-ghost">
              Về chúng tôi
            </Link>
          </div>
          <dl className="facts">
            <div>
              <dt>Thành lập</dt>
              <dd>2023</dd>
            </div>
            <div>
              <dt>Founder & CEO</dt>
              <dd>Trương Văn Trường</dd>
            </div>
            <div>
              <dt>Trụ sở</dt>
              <dd>Huế</dd>
            </div>
            <div>
              <dt>Chi nhánh</dt>
              <dd>Đà Nẵng</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <SecHead h="Sản phẩm" to="/san-pham" link="Tất cả sản phẩm" />
          <Panels />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead h="Dự án tiêu biểu" to="/du-an" link="Xem tất cả dự án" />
          <ProjectGrid items={projects.slice(0, 6)} />
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <SecHead
            h="Quy trình làm việc"
            to="/quy-trinh"
            link="Chi tiết quy trình"
          />
          <ol className="track">
            {steps.map((x) => (
              <li key={x.name}>
                <strong>{x.name}</strong>
                <span>{x.desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Cta />
    </Page>
  );
}
