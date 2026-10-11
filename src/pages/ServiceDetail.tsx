import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "../data/services";
import { imageById, getServiceImages } from "../lib/images";
import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import ImageCarousel from "../components/ui/ImageCarousel";
import { LinkButton } from "../components/ui/Button";
import CTA from "../components/ui/CTA";
import NotFound from "./NotFound";
export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <NotFound />;
  return (
    <PageTransition>
      <SEO
        title={service.shortTitle}
        description={service.intro}
        canonical={`/services/${service.slug}`}
      />
      <PageHero
        kicker={service.shortTitle}
        title={service.title}
        intro={service.intro}
        image={imageById(service.image)}
        parent={{ label: "What we do", to: "/services" }}
      />
      <section className="section">
        <Container className="detail-layout">
          <aside className="detail-sidebar">
            <span className="eyebrow">{service.group}</span>
            <h2>{service.shortTitle}</h2>
            <p>{service.overview}</p>
            <nav aria-label="On this page">
              {service.sections.map((s, i) => (
                <a key={s.title} href={`#section-${i + 1}`}>
                  {s.title}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
            </nav>
            <LinkButton
              to={`/contact?type=${encodeURIComponent(service.shortTitle)}`}
              variant="dark"
            >
              Discuss an opportunity
            </LinkButton>
          </aside>
          <div className="detail-content">
            {service.sections.map((s, i) => (
              <section
                className="prose detail-section"
                id={`section-${i + 1}`}
                key={s.title}
              >
                <span className="section-index">
                  0{i + 1} / {service.group}
                </span>
                <h2>{s.title}</h2>
                {s.paragraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
                {s.points && (
                  <ul className="check-list">
                    {s.points.map((point) => (
                      <li key={point}>
                        <Check size={17} aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section className="brief-box">
              <span className="eyebrow">Prepare your enquiry</span>
              <h2>A clear starting point.</h2>
              <p>
                Include the following information when opening the conversation.
              </p>
              <ul>
                {service.enquiry.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <LinkButton
                to={`/contact?type=${encodeURIComponent(service.shortTitle)}`}
              >
                Prepare an enquiry
              </LinkButton>
            </section>
          </div>
        </Container>
      </section>
      <section className="section surface-section">
        <Container>
          <SectionTitle
            kicker="In pictures"
            title="A closer view of the industry."
            desc="Explore the geology, materials and working environments behind this activity."
          />
          <ImageCarousel images={getServiceImages(service.slug).gallery} />
        </Container>
      </section>
      <section className="section">
        <Container>
          <SectionTitle
            kicker="Continue exploring"
            title="Connected activities."
          />
          <div className="related-links">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`}>
                  <span>{s.number}</span>
                  <h3>{s.shortTitle}</h3>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </Link>
              ))}
          </div>
        </Container>
      </section>
      <CTA />
    </PageTransition>
  );
}
