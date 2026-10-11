import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { commodities } from "../data/commodities";
import { imageById } from "../lib/images";
import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Photo from "../components/ui/Photo";
import CTA from "../components/ui/CTA";
import NotFound from "./NotFound";
export default function CommodityDetail() {
  const { slug } = useParams();
  const c = commodities.find((x) => x.slug === slug);
  if (!c) return <NotFound />;
  return (
    <PageTransition>
      <SEO
        title={`${c.name} guide`}
        description={c.intro}
        canonical={`/commodities/${c.slug}`}
      />
      <PageHero
        kicker={c.name}
        title={`${c.name}. In context.`}
        intro={c.intro}
        parent={{ label: "Commodity guide", to: "/commodities" }}
      />
      <section className="section">
        <Container className="commodity-detail">
          <div>
            <span className="element element-large">{c.symbol}</span>
            {typeof c.image === "number" ? (
              <Photo
                image={imageById(c.image)}
                contain
                className="commodity-detail-photo"
              />
            ) : (
              <img
                src={c.image.src}
                alt={c.image.alt}
                width={c.image.width}
                height={c.image.height}
                loading="lazy"
                decoding="async"
                className="photo photo-contain commodity-detail-photo"
              />
            )}
            <p className="image-caption">
              {typeof c.image === "number"
                ? imageById(c.image).alt
                : c.image.alt}
            </p>
          </div>
          <div className="prose">
            <span className="eyebrow">Applications & supply</span>
            <h2>Where it fits.</h2>
            <ul>
              {c.uses.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <h2>The material’s route.</h2>
            {c.chain.map((x) => (
              <p key={x}>{x}</p>
            ))}
            <h2>Questions for a commercial brief.</h2>
            <ul>
              {c.considerations.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p>
              Bring the material description together with the quantity, the
              proposed timetable and the required delivery point. For supply
              enquiries, include origin information and available analysis. For
              buying enquiries, state the specification needed by the receiving
              application.
            </p>
            <p>
              A complete product specification brings quality, composition and
              delivery requirements together. Clear technical information helps
              match the material with its intended application.
            </p>
            <a
              className="text-link"
              href={c.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Further industry reading{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </Container>
      </section>
      <section className="section surface-section">
        <Container>
          <span className="eyebrow">Keep exploring</span>
          <h2>More materials. More connections.</h2>
          <div className="related-links">
            {commodities
              .filter((x) => x.slug !== c.slug)
              .slice(0, 3)
              .map((x) => (
                <Link key={x.slug} to={`/commodities/${x.slug}`}>
                  <span>{x.symbol}</span>
                  <h3>{x.name}</h3>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </Link>
              ))}
          </div>
        </Container>
      </section>
      <CTA
        title={`Open a ${c.name.toLowerCase()} enquiry.`}
        to="/contact?type=Commodity%20buying%20%26%20offtake"
      />
    </PageTransition>
  );
}
