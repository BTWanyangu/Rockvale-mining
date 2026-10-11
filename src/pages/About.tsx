import Container from "../components/ui/Container";
import PageTransition from "../components/ui/PageTransition";
import PageHero from "../components/ui/PageHero";
import SEO from "../components/ui/SEO";
import SectionTitle from "../components/ui/SectionTitle";
import { LinkButton } from "../components/ui/Button";
import Photo from "../components/ui/Photo";
import ImageCarousel from "../components/ui/ImageCarousel";
import CTA from "../components/ui/CTA";
import { getPageImages, imageById } from "../lib/images";
export default function About() {
  return (
    <PageTransition>
      <SEO
        title="Who we are"
        description="Get to know RockValle Resources and its connected perspective on exploration, mining and trading."
        canonical="/about"
      />
      <PageHero
        kicker="Who we are"
        title="From the ground up. With a wider view."
        intro="RockValle Resources brings exploration, mining and trading into one connected resource identity."
        image={imageById(36)}
      />
      <section className="section">
        <Container className="editorial-split">
          <SectionTitle
            kicker="Our perspective"
            title="Understanding the whole journey."
          />
          <div className="prose">
            <p>
              Natural resources connect geology with everyday industry. Between
              a mineral occurrence and a usable product lie technical questions,
              operating choices and commercial relationships. Understanding
              those connections helps turn an initial opportunity into a more
              focused discussion.
            </p>
            <p>
              RockValle’s identity rests on three activities: exploration,
              mining and trading. Each looks at a different part of the journey.
              Together, they frame a broader perspective on how materials can be
              evaluated, developed and connected with demand.
            </p>
            <p>
              A clear opportunity is more than a promising photograph or an
              isolated result. It includes reliable information about the
              material, its origin, the present stage of work and the intended
              outcome. Those details give a partnership conversation a practical
              starting point.
            </p>
            <LinkButton to="/services" variant="dark">
              Explore our business
            </LinkButton>
          </div>
        </Container>
      </section>
      <section className="section surface-section">
        <Container>
          <div className="section-top">
            <SectionTitle
              kicker="One connected perspective"
              title="Discover. Develop. Deliver."
            />
            <p>
              Different questions at each stage. A shared need for evidence,
              clarity and a workable next step.
            </p>
          </div>
          <div className="feature-grid">
            {[
              {
                n: "01",
                title: "Exploration",
                body: "Understand the geological setting, the evidence already available and the questions that remain. Evaluation creates the context for a considered development decision.",
                note: "Evidence before assumptions.",
              },
              {
                n: "02",
                title: "Mining",
                body: "Connect the characteristics of a resource with an appropriate technical route. Extraction, preparation and quality requirements belong in the same operational discussion.",
                note: "The resource shapes the route.",
              },
              {
                n: "03",
                title: "Trading",
                body: "Bring the material and the market together through clear specifications, counterparties and delivery requirements. The physical supply chain matters as much as the commercial terms.",
                note: "Clear requirements, useful connections.",
              },
            ].map((i) => (
              <article className="feature-card" key={i.n}>
                <span className="step-number">{i.n}</span>
                <h3>{i.title}</h3>
                <p>{i.body}</p>
                <strong>{i.note}</strong>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section">
        <Container className="image-editorial">
          <Photo image={imageById(5)} />
          <div>
            <span className="eyebrow">Working together</span>
            <h2>
              A better brief.
              <br />A better conversation.
            </h2>
            <div className="prose">
              <p>
                Resource partnerships bring together people with different kinds
                of expertise. Technical specialists, asset owners, suppliers,
                buyers and logistics providers need a common understanding of
                the opportunity. Clear information helps them ask better
                questions and identify the responsibilities that need to be
                agreed.
              </p>
              <p>
                For an initial RockValle enquiry, describe the resource or
                product, the available evidence and your objective.
                Site-specific expertise, service scope, facilities and
                commercial terms are confirmed in the resulting discussion.
              </p>
            </div>
            <LinkButton to="/partners" variant="dark">
              Partnership pathways
            </LinkButton>
          </div>
        </Container>
      </section>
      <section className="section surface-section">
        <Container>
          <SectionTitle
            kicker="A closer view"
            title="Resources in context."
            desc="Explore the environments, equipment, materials and people that connect the resource value chain."
          />
          <ImageCarousel images={getPageImages("about").gallery} />
          <div className="profile-note">
            <h3>Corporate information</h3>
            <p>
              Detailed company history, leadership profiles, operating locations
              and formal policy statements will be published when the
              corresponding information is confirmed.
            </p>
          </div>
        </Container>
      </section>
      <CTA />
    </PageTransition>
  );
}
