import { Page, Head, Cta, getTechLogo, tech } from "../components/Shared";

export function Tech() {
  return (
    <Page
      title="Công nghệ và năng lực"
      desc="Các công nghệ Platinum Technology sử dụng: ASP.NET Core 8, React Native, Next.js, NestJS, PostgreSQL, Kubernetes và AI agent."
      crumbs={[
        ["/", "Trang chủ"],
        [null, "Công nghệ"],
      ]}
    >
      <Head h="Công nghệ và năng lực" />
      <section className="sec">
        <div className="wrap">
          <dl className="techlist">
            {tech.map((g) => (
              <div key={g.group}>
                <dt>{g.group}</dt>
                <dd>
                  <ul className="tech-grid">
                    {g.items.map((i) => (
                      <li key={i} className="tech-item">
                        <div className="tech-icon-wrap">
                          <img
                            src={getTechLogo(i)}
                            alt={`Logo ${i}`}
                            loading="lazy"
                          />
                        </div>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <Cta />
    </Page>
  );
}
