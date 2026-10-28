import { Link, useParams } from "react-router-dom";
import { Page, Head, Cta, projects } from "../components/Shared";
import { NotFound } from "./NotFound";

export function ProjectDetail() {
  const p = projects.find((x) => x.slug === useParams().slug);
  if (!p) return <NotFound />;

  return (
    <Page
      title={p.name}
      desc={p.summary}
      crumbs={[
        ["/", "Trang chủ"],
        ["/du-an", "Dự án"],
        [null, p.name],
      ]}
    >
      <Head h={p.name} p={p.summary} />
      <section className="sec">
        <div className="wrap prose">
          <Link to="/du-an" className="more">
            Quay lại danh sách dự án
          </Link>
        </div>
      </section>
      <Cta text="Muốn xây dựng một hệ thống tương tự?" />
    </Page>
  );
}
