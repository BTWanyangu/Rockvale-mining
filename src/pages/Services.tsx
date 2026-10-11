import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import ServiceCard from "../components/services/ServiceCard";
import SectionTitle from "../components/ui/SectionTitle";
import CTA from "../components/ui/CTA";
import { imageById } from "../lib/images";
import { services } from "../data/services";
export default function Services() {
  return (
    <PageTransition>
      <SEO
        title="What we do"
        description="Explore the connected activities of exploration, mining and trading, and learn about the wider resource recovery industry."
        canonical="/services"
      />
      <PageHero
        kicker="What we do"
        title="Value at every stage."
        intro="Explore the questions, processes and relationships connecting a resource opportunity with industrial demand."
        image={imageById(18)}
      />
      <section className="section">
        <Container>
          <div className="section-top">
            <SectionTitle
              kicker="Our business"
              title="A connected resource perspective."
            />
            <p>
              Exploration, mining and trading define RockValle’s identity.
              Material recovery connects that value chain with a longer resource
              lifecycle.
            </p>
          </div>
          <div className="business-grid business-grid-large">
            {services.map((s) => (
              <ServiceCard service={s} key={s.slug} />
            ))}
          </div>
        </Container>
      </section>
      <section className="section surface-section">
        <Container className="editorial-split">
          <SectionTitle
            kicker="Make the first conversation useful"
            title="Start with the material and the objective."
          />
          <div className="prose">
            <p>
              Whether the enquiry concerns a deposit, a mine-stage opportunity
              or a commodity transaction, a common starting point is a clear
              material description. Location, quantity, available technical
              information and the desired outcome help identify what needs to be
              discussed.
            </p>
            <p>
              Commercial expectations and practical constraints belong in the
              brief too. A supply schedule, product specification, access
              requirement or proposed partnership structure can change which
              options are worth evaluating.
            </p>
            <p>
              Choose the activity closest to your enquiry, review the
              information checklist on its detail page and use the contact page
              to prepare your brief. Information can be saved as an enquiry file
              while email delivery is unavailable.
            </p>
          </div>
        </Container>
      </section>
      <CTA title="Where does your opportunity begin?" />
    </PageTransition>
  );
}
