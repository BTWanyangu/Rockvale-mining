import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import InsightCards from "../components/home/InsightCards";
import CTA from "../components/ui/CTA";
export default function Insights() {
  return (
    <PageTransition>
      <SEO
        title="Insights & stories"
        description="Original industry guides on commodity applications, physical supply chains and material recovery."
        canonical="/insights"
      />
      <PageHero
        kicker="Insights & stories"
        title="Inside the resource economy."
        intro="A closer look at the materials, connections and practical questions behind modern industry."
      />
      <section className="section">
        <Container>
          <div className="section-top">
            <SectionTitle
              kicker="Industry perspectives"
              title="Understand the connections."
            />
            <p>
              Explore the connections between mineral resources, industrial
              applications, physical supply chains and material recovery.
            </p>
          </div>
          <InsightCards />
        </Container>
      </section>
      <section className="section surface-section">
        <Container className="editorial-split">
          <SectionTitle
            kicker="From insight to enquiry"
            title="Better questions lead to clearer briefs."
          />
          <div className="prose">
            <p>
              Understanding an application or a supply chain helps identify the
              information an enquiry should include. Composition, quality,
              quantity, source and delivery requirements often matter more than
              the broad name of a commodity.
            </p>
            <p>
              Use these articles alongside the detailed business pages and
              commodity guide to build a clear brief, connect technical details
              with commercial requirements and prepare your next conversation.
            </p>
          </div>
        </Container>
      </section>
      <CTA />
    </PageTransition>
  );
}
