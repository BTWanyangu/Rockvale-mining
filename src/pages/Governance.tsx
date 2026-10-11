import { Link } from "react-router-dom";
import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import CTA from "../components/ui/CTA";
export default function Governance() {
  return (
    <PageTransition>
      <SEO
        title="Governance & ethics"
        description="A practical perspective on business integrity, due diligence and accountable resource partnerships."
        canonical="/governance"
      />
      <PageHero
        kicker="Governance & ethics"
        title="Clear expectations. Accountable decisions."
        intro="A useful business relationship starts with reliable information, transparent responsibilities and an understanding of risk."
      />
      <section className="section">
        <Container className="editorial-split">
          <SectionTitle
            kicker="The basis of trust"
            title="Integrity belongs in the process."
          />
          <div className="prose">
            <p>
              Governance connects decisions with the people responsible for
              them. In a resource relationship, the technical, commercial and
              legal questions can overlap. Clear roles and useful documentation
              help the parties understand what is being proposed and what
              evidence is needed.
            </p>
            <p>
              Ethical business conduct also depends on how relationships are
              managed. Counterparty checks, a clear understanding of ownership
              and a documented origin for materials are practical topics for the
              opening conversation.
            </p>
          </div>
        </Container>
      </section>
      <section className="section surface-section">
        <Container>
          <div className="feature-grid">
            {[
              {
                title: "Know the relationship",
                body: "Identify the parties, their authority and the proposed form of engagement. Ownership, representation and the source of the material should be clear enough to support appropriate due diligence.",
              },
              {
                title: "Agree the responsibilities",
                body: "Define scope, quality, custody, delivery and the commercial terms. Qualified advisers should confirm the applicable legal and regulatory requirements for the particular activity.",
              },
              {
                title: "Keep useful records",
                body: "Maintain the information that connects decisions with the underlying evidence. Traceable documentation supports accountability and provides a basis for resolving questions or variations.",
              },
            ].map((x, i) => (
              <article className="feature-card" key={x.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section">
        <Container className="editorial-split">
          <SectionTitle
            kicker="Before a commitment"
            title="Ask. Verify. Clarify."
          />
          <div className="prose">
            <p>
              A proposed partnership should make its assumptions visible. If a
              document is missing, a material is uncertain or an expectation is
              unclear, that gap should be resolved before it is treated as an
              established fact.
            </p>
            <p>
              Enquiries to RockValle can outline the proposed opportunity and
              the information available. Do not send passwords, banking
              credentials or sensitive personal records through the contact
              form. Confidential technical documentation should follow a
              separately agreed channel.
            </p>
            <Link className="text-link" to="/partners">
              Explore partnership pathways ↗
            </Link>
          </div>
        </Container>
      </section>
      <CTA />
    </PageTransition>
  );
}
