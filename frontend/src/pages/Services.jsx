import {
  Page,
  Head,
  RowList,
  svcRows,
  Cta,
  services,
} from "../components/Shared";

export function Services() {
  return (
    <Page
      title="Dịch vụ"
      desc="10 nhóm dịch vụ: phần mềm, web, mobile, ERP/CRM, AI, UI/UX, DevOps, bảo trì, tư vấn và đào tạo."
      crumbs={[
        ["/", "Trang chủ"],
        [null, "Dịch vụ"],
      ]}
    >
      <Head
        h="Dịch vụ"
        p="Từ tư vấn, thiết kế đến triển khai và vận hành hệ thống."
      />
      <section className="sec">
        <div className="wrap">
          <RowList items={svcRows(services)} />
        </div>
      </section>
      <Cta />
    </Page>
  );
}
