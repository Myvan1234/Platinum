import { Page, Head, Panels } from "../components/Shared";

export function Products() {
  return (
    <Page
      title="Sản phẩm"
      desc="Linora, Linora-ERP, Linora-AI và Platinum AI Agentic."
      crumbs={[
        ["/", "Trang chủ"],
        [null, "Sản phẩm"],
      ]}
    >
      <Head h="Sản phẩm" p="Các sản phẩm do Platinum Technology phát triển." />
      <section className="sec">
        <div className="wrap">
          <Panels />
        </div>
      </section>
    </Page>
  );
}
