import Container from "./Container";
import { LinkButton } from "./Button";
export default function CTA({
  title = "The next opportunity starts with a connection.",
  description = "Bring a clear brief, the available technical information and your commercial objectives. Let’s explore the next step.",
  to = "/contact",
  label = "Start a conversation",
}: {
  title?: string;
  description?: string;
  to?: string;
  label?: string;
}) {
  return (
    <section className="cta-band">
      <Container className="cta-grid">
        <div>
          <span className="eyebrow">Let’s work together</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <LinkButton to={to}>{label}</LinkButton>
      </Container>
    </section>
  );
}
