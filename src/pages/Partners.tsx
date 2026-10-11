import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import { LinkButton } from "../components/ui/Button";
import CTA from "../components/ui/CTA";
import { imageById } from "../lib/images";
const pathways = [
  {
    title: "Supply & sourcing partnerships",
    body: "Describe the commodity or material, its origin, physical form and available quantity. Existing analysis, ownership information and a proposed supply schedule help define what can be evaluated.",
    items: [
      "Material description and available analysis",
      "Origin, authority and documentation",
      "Quantity and proposed supply schedule",
    ],
  },
  {
    title: "Commodity buying & offtake",
    body: "Begin with the receiving application and the specification it requires. Quantity, destination and timing are part of the same brief. A focused brief helps connect the right material with the right receiving application.",
    items: [
      "Required specification and application",
      "Volume, destination and delivery requirements",
      "Proposed commercial structure and timetable",
    ],
  },
  {
    title: "Exploration & development",
    body: "Introduce the resource setting and the present project stage. Geological records, sample information, access conditions and development objectives help identify the questions for a technical and commercial conversation.",
    items: [
      "Location and current project stage",
      "Available technical and ownership information",
      "Development objectives and partnership structure",
    ],
  },
  {
    title: "Material recovery opportunities",
    body: "Provide a clear material description rather than relying on a photograph alone. Composition, classification, quantities and existing handling arrangements are relevant to evaluating a possible recovery relationship.",
    items: [
      "Material source, composition and classification",
      "Available volumes and supporting records",
      "Recovery objectives and handling arrangements",
    ],
  },
];
export default function Partners() {
  return (
    <PageTransition>
      <SEO
        title="Suppliers & partners"
        description="Prepare a clear resource partnership brief for supply, buying, exploration, development or material recovery opportunities."
        canonical="/partners"
      />
      <PageHero
        kicker="Suppliers & partners"
        title="Better connections start with clarity."
        intro="Bring the resource, the evidence and the objective into one focused conversation."
        image={imageById(31)}
      />
      <section className="section">
        <Container>
          <div className="section-top">
            <SectionTitle
              kicker="Partnership pathways"
              title="Where does your opportunity fit?"
            />
            <p>
              Choose the pathway closest to your enquiry and bring the technical
              information, commercial requirements and objectives together.
            </p>
          </div>
          <div className="partnership-grid">
            {pathways.map((x, i) => (
              <article className="partnership-card" key={x.title}>
                <span className="step-number">0{i + 1}</span>
                <h2>{x.title}</h2>
                <p>{x.body}</p>
                <ul>
                  {x.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <LinkButton
                  to={`/contact?type=${encodeURIComponent(x.title)}`}
                  variant="dark"
                >
                  Prepare this enquiry
                </LinkButton>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section surface-section">
        <Container className="editorial-split">
          <SectionTitle
            kicker="Practical next steps"
            title="From introduction to evaluation."
          />
          <div className="prose">
            <p>
              The initial enquiry should make the opportunity understandable
              without exposing sensitive information. A concise description and
              the main requirements are enough to begin. Detailed documents can
              follow through a separately agreed channel.
            </p>
            <p>
              Any subsequent discussion will need to clarify the parties’
              authority, the relevant technical information and the applicable
              commercial, legal and regulatory conditions. A well-defined brief
              gives that evaluation a clear starting point.
            </p>
            <p>
              Material recovery partnerships begin with the input stream, its
              composition and the intended output. Clear information helps
              identify a suitable processing route and receiving application.
            </p>
          </div>
        </Container>
      </section>
      <CTA />
    </PageTransition>
  );
}
