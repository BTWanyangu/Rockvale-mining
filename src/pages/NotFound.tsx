import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import Container from "../components/ui/Container";
import { LinkButton } from "../components/ui/Button";
export default function NotFound() {
  return (
    <PageTransition>
      <SEO
        title="Page not found"
        description="The requested RockValle Resources page could not be found."
        canonical="/404"
        noindex
      />
      <Container className="not-found">
        <span className="eyebrow">404 / Page not found</span>
        <h1>
          Let’s find
          <br />
          the right route.
        </h1>
        <p>
          This address doesn’t match an available page. Explore our business or
          return to the homepage.
        </p>
        <div className="hero-actions">
          <LinkButton to="/">Go to the homepage</LinkButton>
          <LinkButton to="/services" variant="dark">
            Explore our business
          </LinkButton>
        </div>
      </Container>
    </PageTransition>
  );
}
