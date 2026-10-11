import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ServiceCard from "../services/ServiceCard";
import { services } from "../../data/services";
import { Link } from "react-router-dom";
export default function BusinessOverview() {
  return (
    <section className="section business">
      <Container>
        <div className="section-top">
          <SectionTitle kicker="What we do" title="Value at every stage." />
          <p>
            A connected perspective on exploration, mining and trading, with a
            guide to the wider role of resource recovery.
          </p>
        </div>
        <div className="business-grid">
          {services.map((s) => (
            <ServiceCard service={s} key={s.slug} />
          ))}
        </div>
        <div className="value-chain">
          {[
            {
              title: "Explore & assess",
              body: "Geological understanding, resource evaluation and development questions.",
            },
            {
              title: "Extract & process",
              body: "Mining routes, material preparation and product specifications.",
            },
            {
              title: "Source & deliver",
              body: "Commercial terms, quality and the physical supply chain.",
            },
            {
              title: "Recover & reuse",
              body: "An industry perspective on the value in secondary materials.",
            },
          ].map((step, i) => (
            <div className="value-step" key={step.title}>
              <small>0{i + 1}</small>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
        <Link className="text-link business-overview-link" to="/operations">
          Follow the resource value chain →
        </Link>
      </Container>
    </section>
  );
}
