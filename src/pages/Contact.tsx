import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { site } from "../data/site";
import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import ContactFormSection from "../components/contact/ContactFormSection";
import { Link } from "react-router-dom";
export default function Contact() {
  const hasContact = site.email || site.phone || site.address;
  return (
    <PageTransition>
      <SEO
        title="Contact & business enquiries"
        description="Prepare a business enquiry for RockValle Resources about exploration, mining, commodity supply or a partnership opportunity."
        canonical="/contact"
      />
      <PageHero
        kicker="Let’s work together"
        title="The next opportunity starts here."
        intro="Bring a clear brief. Let’s understand the material, the context and the outcome you want to explore."
        compact
      />
      <section className="section">
        <Container className="contact-grid">
          <aside>
            <SectionTitle
              kicker="Start the conversation"
              title="Make the first connection count."
              desc="A useful introduction explains the opportunity and the information available. Select the category closest to your enquiry."
            />
            <div className="contact-details">
              {site.email && (
                <a href={`mailto:${site.email}`}>
                  <Mail size={21} aria-hidden="true" />
                  <div>
                    <span>Email</span>
                    <strong>{site.email}</strong>
                  </div>
                </a>
              )}
              {site.phone && (
                <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>
                  <Phone size={21} aria-hidden="true" />
                  <div>
                    <span>Phone</span>
                    <strong>{site.phone}</strong>
                  </div>
                </a>
              )}
              {site.address && (
                <div>
                  <MapPin size={21} aria-hidden="true" />
                  <div>
                    <span>Address</span>
                    <strong>{site.address}</strong>
                  </div>
                </div>
              )}
              {site.hours && (
                <div>
                  <Clock size={21} aria-hidden="true" />
                  <div>
                    <span>Business hours</span>
                    <strong>{site.hours}</strong>
                  </div>
                </div>
              )}
              {!hasContact && (
                <div className="contact-pending">
                  <Mail size={24} aria-hidden="true" />
                  <h3>Prepare your business enquiry.</h3>
                  <p>
                    Tell us about your opportunity, preferred timetable and the
                    information you have available.
                  </p>
                </div>
              )}
            </div>
            <div className="enquiry-help">
              <h3>Helpful information to include</h3>
              <ul>
                <li>The material, product or resource opportunity</li>
                <li>Location, origin and the present stage of work</li>
                <li>Available technical information or analysis</li>
                <li>Quantity, timetable and your desired outcome</li>
              </ul>
              <Link className="text-link" to="/partners">
                Explore partnership pathways
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </aside>
          <ContactFormSection />
        </Container>
      </section>
      <section className="section surface-section">
        <Container className="faq-layout">
          <SectionTitle
            kicker="Before you enquire"
            title="A few useful answers."
          />
          <div className="faq-list">
            {[
              {
                q: "Does a download send my enquiry?",
                a: "Downloading saves a copy on your device. To submit it through the website, use Send enquiry when email delivery is available.",
              },
              {
                q: "When can I use the Send enquiry button?",
                a: "Sending is available only when the website’s email service reports that delivery is configured and verified. If delivery is unavailable, the form explains that status and still lets you download your prepared brief.",
              },
              {
                q: "Should I send confidential documents here?",
                a: "Use the form for a concise introduction. Do not include passwords, banking credentials, identity documents or confidential technical records. A separate channel can be agreed for detailed information.",
              },
              {
                q: "What should I include in a commodity enquiry?",
                a: "Include the material, physical form, specification, quantity, origin or destination and preferred delivery schedule. Available analysis helps make the discussion more productive.",
              },
              {
                q: "Where can I explore minerals and gemstones?",
                a: "Browse the resource gallery for specimen images, mineral charts, gold and copper guides, mining environments and equipment. Filter by category or search for a subject.",
              },
            ].map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span className="detail-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
