import { useState } from "react";
import { Page, Head, ProjectGrid, projects } from "../components/Shared";

export function Projects() {
  const cats = ["Tất cả", ...new Set(projects.map((p) => p.category))];
  const [c, setC] = useState("Tất cả");
  const list =
    c === "Tất cả" ? projects : projects.filter((p) => p.category === c);

  return (
    <Page
      title="Dự án tiêu biểu"
      desc="Các dự án phần mềm tiêu biểu của Platinum Technology."
      crumbs={[
        ["/", "Trang chủ"],
        [null, "Dự án"],
      ]}
    >
      <Head h="Dự án tiêu biểu" />
      <section className="sec">
        <div className="wrap">
          <div className="filters" role="group" aria-label="Lọc theo danh mục">
            {cats.map((x) => (
              <button
                key={x}
                className={x === c ? "chip on" : "chip"}
                aria-pressed={x === c}
                onClick={() => setC(x)}
              >
                {x}
              </button>
            ))}
          </div>
          {list.length ? (
            <ProjectGrid items={list} />
          ) : (
            <p>Chưa có dự án trong danh mục này.</p>
          )}
        </div>
      </section>
    </Page>
  );
}
