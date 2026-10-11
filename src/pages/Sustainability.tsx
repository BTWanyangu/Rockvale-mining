import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import ImageCarousel from "../components/ui/ImageCarousel";
import CTA from "../components/ui/CTA";
import { imageById, getPageImages } from "../lib/images";
export default function Sustainability() {
  return (
    <PageTransition>
      <SEO
        title="A responsible resource perspective"
        description="Explore the people, environmental and sourcing considerations around responsible resource activity."
        canonical="/sustainability"
      />
      <PageHero
        kicker="Sustainability"
        title="Consider the impact. At every stage."
        intro="Resource decisions connect people, land, water and industry. A responsible perspective considers that wider context."
        image={imageById(15)}
      />
      <section className="section">
        <Container>
          <div className="editorial-split">
            <SectionTitle
              kicker="A responsible perspective"
              title="Progress needs a longer view."
            />
            <div className="prose">
              <p>
                Resource activity can create value while also changing the
                places and communities around it. Its benefits, risks and
                long-term consequences need to be understood together. A
                practical discussion therefore extends beyond production or a
                commercial transaction.
              </p>
              <p>
                Our resource perspective brings people, safe work, environmental
                care and responsible sourcing into the same conversation. These
                priorities guide the questions we ask across the value chain.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="section surface-section">
        <Container>
          <div className="responsibility-rows">
            {[
              {
                title: "People & safe work",
                body: [
                  "People are part of every resource decision. Workers, suppliers and surrounding communities can experience different benefits and risks. Understanding those relationships helps identify the responsibilities that need to be considered.",
                  "Safe work brings qualified assessment, appropriate training and practical controls together. Clear roles and communication help translate risk assessment into everyday decisions.",
                ],
                points: [
                  "Site-specific risk assessment and safe-work controls",
                  "Worker welfare, human rights and respectful engagement",
                  "Clear responsibilities, communication and reporting",
                ],
              },
              {
                title: "Land, water & the operating lifecycle",
                body: [
                  "Land disturbance, water use, biodiversity, waste rock and tailings can be relevant at different stages of resource activity. The setting, the material and the processing route determine which issues need the closest attention.",
                  "Planning should consider the full lifecycle, including rehabilitation and closure where applicable. Useful environmental statements describe the scope of measurement and the evidence behind a claim, rather than relying on an unsupported headline.",
                ],
                points: [
                  "The setting, affected resources and potential impacts",
                  "Water, residues and material-management pathways",
                  "Monitoring, rehabilitation and closure considerations",
                ],
              },
              {
                title: "Sourcing & accountable relationships",
                body: [
                  "The origin of a material and the conduct of business partners matter to the supply chain. Counterparty information, traceable records and an understanding of the relevant risks can support more accountable decisions.",
                  "Responsible sourcing is a continuing process. Its requirements depend on the product, the route and the jurisdictions involved. The expectations of the parties should be clear before an engagement is agreed.",
                ],
                points: [
                  "Material origin and counterparty due diligence",
                  "Documented quality, custody and commercial terms",
                  "Ethics, transparency and mechanisms for raising concerns",
                ],
              },
            ].map((r, i) => (
              <section className="responsibility-row" key={r.title}>
                <span className="step-number">0{i + 1}</span>
                <h2>{r.title}</h2>
                <div className="prose">
                  {r.body.map((x) => (
                    <p key={x}>{x}</p>
                  ))}
                  <ul>
                    {r.points.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
      <section className="section">
        <Container>
          <SectionTitle
            kicker="Accountability & progress"
            title="Make responsibility visible."
            desc="A credible statement needs a clear scope, an appropriate measure and the information that supports it."
          />
          <div className="feature-grid">
            <article className="feature-card">
              <h3>Define the scope.</h3>
              <p>
                Identify the operation, the period and the activity being
                described. Clear boundaries help make results useful for
                workers, communities and commercial partners.
              </p>
            </article>
            <article className="feature-card">
              <h3>Explain the measure.</h3>
              <p>
                Environmental and safety figures need context. Methods,
                boundaries and comparison periods affect how a result can be
                understood.
              </p>
            </article>
            <article className="feature-card">
              <h3>Support the statement.</h3>
              <p>
                Traceable records connect policies, permits and performance
                information with the decisions they support. Current evidence
                makes progress easier to assess and communicate.
              </p>
            </article>
          </div>
          <ImageCarousel images={getPageImages("sustainability").gallery} />
        </Container>
      </section>
      <CTA
        title="Bring responsibility into the conversation."
        to="/partners"
        label="Explore partnerships"
      />
    </PageTransition>
  );
}
