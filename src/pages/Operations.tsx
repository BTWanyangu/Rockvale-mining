import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import ValueChain from "../components/services/ValueChain";
import ImageCarousel from "../components/ui/ImageCarousel";
import CTA from "../components/ui/CTA";
import { imageById, getPageImages } from "../lib/images";
export default function Operations() {
  return (
    <PageTransition>
      <SEO
        title="The resource value chain"
        description="Understand the operational connections between evaluation, extraction, processing, logistics and material recovery."
        canonical="/operations"
      />
      <PageHero
        kicker="The resource value chain"
        title="A clearer view of the whole system."
        intro="Follow the connections from geological evidence to a product’s route into use."
        image={imageById(54)}
      />
      <section className="section">
        <Container>
          <div className="section-top">
            <SectionTitle
              kicker="Explore the process"
              title="Every stage changes the next."
            />
            <p>
              Select a stage to see the practical questions that connect it with
              the wider resource chain.
            </p>
          </div>
          <ValueChain />
        </Container>
      </section>
      <section className="section surface-section">
        <Container className="editorial-split">
          <SectionTitle
            kicker="Material movement"
            title="What connects the stages?"
          />
          <div className="prose">
            <p>
              Information travels with a material. Its identity, composition,
              location and handling history can affect decisions throughout the
              value chain. Maintaining useful records makes it easier to
              understand an issue and reconcile a change in quantity or quality.
            </p>
            <p>
              Physical interfaces matter just as much. A loading point, a
              storage area or a receiving facility has practical requirements
              that need to be known before the movement is agreed. Equipment
              suitability and transport arrangements should reflect those real
              conditions.
            </p>
            <p>
              Operational discussions are most productive when technical and
              commercial requirements are considered together. A product
              specification, a proposed volume and a delivery timetable need to
              describe a route that can actually work.
            </p>
          </div>
        </Container>
      </section>
      <section className="section">
        <Container>
          <SectionTitle
            kicker="Practical considerations"
            title="Ask the right questions early."
          />
          <div className="feature-grid">
            {[
              {
                title: "Quality & traceability",
                body: "What information identifies the material? How are samples taken, results recorded and acceptance requirements agreed? Useful documentation connects the technical description with the commercial transaction.",
              },
              {
                title: "Handling & logistics",
                body: "Where will the material be loaded, stored and delivered? Which access, packaging and handling requirements apply? A clear physical route helps expose constraints before a delivery is committed.",
              },
              {
                title: "Risk & responsibility",
                body: "Which site-specific controls, permits and qualified assessments are needed? How are the responsibilities of the parties defined? Clear assessment and documentation connect those controls with everyday operational decisions.",
              },
            ].map((x, i) => (
              <article className="feature-card" key={x.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
              </article>
            ))}
          </div>
          <ImageCarousel images={getPageImages("operations").gallery} />
        </Container>
      </section>
      <CTA
        title="Bring the opportunity into focus."
        description="Describe the material, the present stage, the available information and the outcome you want to explore."
      />
    </PageTransition>
  );
}
