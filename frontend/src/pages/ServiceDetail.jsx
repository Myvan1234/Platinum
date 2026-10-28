import { useParams } from "react-router-dom";
import { Page, Head, List, Cta, services } from "../components/Shared";
import { NotFound } from "./NotFound";

export function ServiceDetail() {
  const s = services.find((x) => x.slug === useParams().slug);
  if (!s) return <NotFound />;

  return (
    <Page
      title={s.name}
      desc={s.summary}
      crumbs={[
        ["/", "Trang chủ"],
        ["/dich-vu", "Dịch vụ"],
        [null, s.name],
      ]}
    >
      <Head h={s.name} p={s.summary} />
      <section className="sec">
        <div className="wrap two">
          <div>
            <h2>Lợi ích</h2>
            <List items={s.benefits} />
            <h2>Đối tượng phù hợp</h2>
            <p>{s.audience}</p>
          </div>
          <div>
            <h2>Phạm vi công việc</h2>
            <List items={s.scope} />
          </div>
        </div>
      </section>
      <Cta text={`Cần tư vấn về ${s.name.toLowerCase()}?`} />
    </Page>
  );
}
