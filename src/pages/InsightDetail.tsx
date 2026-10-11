import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { insights } from "../data/insights";
import { imageById } from "../lib/images";
import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Photo from "../components/ui/Photo";
import CTA from "../components/ui/CTA";
import NotFound from "./NotFound";
export default function InsightDetail() {
  const { slug } = useParams();
  const insight = insights.find((i) => i.slug === slug);
  if (!insight) return <NotFound />;
  return (
    <PageTransition>
      <SEO
        title={insight.title}
        description={insight.summary}
        canonical={`/insights/${insight.slug}`}
      />
      <PageHero
        kicker={insight.category}
        title={insight.title}
        intro={insight.summary}
        parent={{ label: "Insights", to: "/insights" }}
      />
      <section className="section">
        <Container className="article-layout">
          <aside>
            <span className="eyebrow">Industry guide</span>
            <p>{insight.readingTime}</p>
            <Photo image={imageById(insight.image)} contain />
            <p className="image-caption">{imageById(insight.image).alt}</p>
          </aside>
          <article className="prose article-content">
            {insight.sections.map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                {s.paragraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </section>
            ))}
            <div className="article-sources">
              <h2>Further reading</h2>
              {insight.sources.map((s) => (
                <a
                  href={s.url}
                  key={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
            <Link className="text-link" to="/insights">
              ← All insights
            </Link>
          </article>
        </Container>
      </section>
      <CTA />
    </PageTransition>
  );
}
