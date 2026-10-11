import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";
import Logo from "./Logo";
import { site } from "../../data/site";
import { services } from "../../data/services";
export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-top">
          <div>
            <Logo />
            <p className="footer-about">
              Connecting resources, people and opportunity across exploration,
              mining and commodity trading.
            </p>
            <span className="footer-tagline">
              EXPLORATION · MINING · TRADING
            </span>
          </div>
          <div>
            <h2>Our business</h2>
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}>
                {s.shortTitle}
              </Link>
            ))}
            <Link to="/commodities">Commodity guide</Link>
          </div>
          <div>
            <h2>Explore RockValle</h2>
            <Link to="/about">Who we are</Link>
            <Link to="/operations">Resource value chain</Link>
            <Link to="/sustainability">Sustainability</Link>
            <Link to="/governance">Governance & ethics</Link>
            <Link to="/gallery">Resource gallery</Link>
            <Link to="/insights">Insights & stories</Link>
          </div>
          <div>
            <h2>Connect</h2>
            <Link to="/partners">Suppliers & partners</Link>
            <Link to="/contact">
              Business enquiries <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            {site.phone && (
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>
                {site.phone}
              </a>
            )}
            {site.address && <p className="footer-address">{site.address}</p>}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <div>
            <Link to="/privacy">Privacy information</Link>
            <Link to="/terms">Terms of use</Link>
          </div>
          <span>Natural resources. Lasting value.</span>
        </div>
      </Container>
    </footer>
  );
}
