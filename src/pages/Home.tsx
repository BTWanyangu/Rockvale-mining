import { Link } from "react-router-dom";
import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Reveal from "../components/ui/Reveal";
import { LinkButton } from "../components/ui/Button";
import HeroSlider from "../components/home/HeroSlider";
import BusinessOverview from "../components/home/BusinessOverview";
import InsightCards from "../components/home/InsightCards";
import Photo from "../components/ui/Photo";
import { imageById } from "../lib/images";
import { commodities } from "../data/commodities";
export default function Home() {
  return (
    <PageTransition>
      <SEO
        title="RockValle Resources"
        description="Explore RockValle Resources: exploration, mining and trading, with insight into commodities and the resource value chain."
        canonical="/"
      />
      <HeroSlider />
      <div className="commodity-strip">
        <Container>
          {[
            "Copper",
            "Cobalt",
            "Nickel",
            "Zinc & lead",
            "Ferroalloys",
            "Energy",
            "Recovery",
          ].map((label) => (
            <Link key={label} to="/commodities">
              {label}
              <span aria-hidden="true">◆</span>
            </Link>
          ))}
        </Container>
      </div>
      <section className="section intro">
        <Container>
          <Reveal className="intro-grid">
            <div>
              <span className="eyebrow">Who we are</span>
              <h2>
                One connected
                <br />
                <span>resource perspective.</span>
              </h2>
            </div>
            <div className="intro-copy">
              <p>
                The journey from a mineral occurrence to an industrial product
                takes more than extraction. It takes technical understanding,
                considered development and a supply chain that works.
              </p>
              <p>
                RockValle Resources brings exploration, mining and trading into
                one clear identity: connecting resource opportunities with
                practical commercial questions.
              </p>
              <Link className="text-link" to="/about">
                Get to know RockValle ↗
              </Link>
            </div>
          </Reveal>
          <div className="principles">
            {[
              {
                label: "01 / DISCOVER",
                title: "Understand the resource.",
                body: "Geological evidence and careful evaluation set the foundation for development.",
              },
              {
                label: "02 / DEVELOP",
                title: "Consider the pathway.",
                body: "The material, the setting and the required product shape a workable route.",
              },
              {
                label: "03 / DELIVER",
                title: "Connect it to demand.",
                body: "Quality, commercial terms and logistics bring supply and industrial need together.",
              },
            ].map((v) => (
              <div className="principle" key={v.label}>
                <span className="number">{v.label}</span>
                <strong>{v.title}</strong>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <BusinessOverview />
      <section className="section commodities-section">
        <Container className="commodities-grid">
          <div>
            <SectionTitle
              kicker="Our commodity guide"
              title="The building blocks of modern life."
              desc="From electrical networks to manufacturing, mineral and energy products sit behind the systems we use every day."
            />
            <div className="portfolio-foot">
              {["Infrastructure", "Manufacturing", "Energy", "Mobility"].map(
                (item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ),
              )}
            </div>
            <Link className="text-link" to="/commodities">
              Explore the commodity guide ↗
            </Link>
          </div>
          <div className="commodity-list">
            {commodities.map((c) => (
              <details key={c.slug}>
                <summary>
                  <span className="element">{c.symbol}</span>
                  {c.name}
                  <span className="detail-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="commodity-summary">
                  <p>{c.intro}</p>
                  <Link className="text-link" to={`/commodities/${c.slug}`}>
                    Explore {c.name.toLowerCase()} ↗
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <section className="sustainability-preview">
        <Photo
          image={imageById(36)}
          className="sustainability-background"
          sizes="100vw"
        />
        <Container>
          <div>
            <span className="eyebrow">A responsible perspective</span>
            <h2>
              Progress with
              <br />
              responsibility
              <br />
              at its core.
            </h2>
            <p className="sustain-copy">
              Resource decisions have lasting consequences. Safety,
              environmental understanding and transparent relationships belong
              at every stage of the journey.
            </p>
            <LinkButton to="/sustainability" variant="outline">
              Explore the principles
            </LinkButton>
          </div>
          <div className="sustain-pillars">
            {[
              {
                title: "People & safety",
                body: "Consider safe work, human rights and the people affected by resource activity.",
              },
              {
                title: "Environment & resources",
                body: "Understand water, land, biodiversity and the lifecycle of materials.",
              },
              {
                title: "Integrity & sourcing",
                body: "Bring due diligence, clear records and accountable decisions into the supply chain.",
              },
            ].map((item, i) => (
              <div className="sustain-pillar" key={item.title}>
                <b>0{i + 1}</b>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="section">
        <Container>
          <div className="section-top">
            <SectionTitle
              kicker="Inside the resource economy"
              title="A closer look."
            />
            <Link className="text-link" to="/insights">
              All insights ↗
            </Link>
          </div>
          <InsightCards />
        </Container>
      </section>
      <section className="partners-preview">
        <Container>
          <div>
            <span className="eyebrow">Let’s work together</span>
            <h2>
              The next opportunity
              <br />
              starts with a connection.
            </h2>
            <p>
              For producers, suppliers, industrial buyers and development
              partners, a clear brief makes the first conversation more
              productive.
            </p>
          </div>
          <div className="partner-list">
            {[
              "Supply & sourcing partnerships",
              "Commodity buying & offtake",
              "Exploration & development",
              "Material recovery opportunities",
            ].map((item, i) => (
              <Link key={item} to={`/contact?type=${encodeURIComponent(item)}`}>
                {item}
                <span>0{i + 1} ↗</span>
              </Link>
            ))}
            <Link to="/partners">
              Explore partnership pathways<span>→</span>
            </Link>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
