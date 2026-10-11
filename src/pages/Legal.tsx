import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
const privacy = [
  {
    title: "Information in an enquiry",
    text: "The contact form asks for your name, email, enquiry category and message. Organisation and phone details are optional. If email delivery is available and you submit the form, those details are passed to the configured email service so the enquiry can be considered and answered.",
  },
  {
    title: "Preparing a local copy",
    text: "Downloading an enquiry creates a text file on your device. The download action does not submit the enquiry. You control the resulting file and any later sharing of it. The website does not save the form to local browser storage.",
  },
  {
    title: "Website operation",
    text: "This implementation does not include analytics trackers, advertising cookies or an account system. The enquiry service uses short-lived in-memory request counters to limit abuse. Hosting and email providers may process operational information according to their own services and the owner’s configuration.",
  },
  {
    title: "Questions about your enquiry",
    text: "Use the contact page for questions about information included in your enquiry. Keep the initial message concise and share detailed records through a channel agreed for that purpose.",
  },
];
const terms = [
  {
    title: "Purpose of the website",
    text: "This website introduces RockValle Resources, its connected exploration, mining and trading perspective, and the materials and relationships that shape the resource value chain.",
  },
  {
    title: "Commercial and technical decisions",
    text: "Commercial discussions bring the material specification, responsibilities, quantity, price and delivery requirements together. The terms agreed by the parties govern each engagement.",
  },
  {
    title: "Photography and external reading",
    text: "The resource gallery brings together mining imagery, materials and mineral guides. External reading links lead to websites whose content and policies are managed by their respective operators.",
  },
  {
    title: "Enquiries and local files",
    text: "Use the contact form to introduce a business opportunity. Download enquiry saves a copy on your device; Send enquiry submits it through the configured email service when that option is available.",
  },
];
export default function Legal({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy";
  const title = isPrivacy
    ? "Website privacy information"
    : "Website terms of use";
  return (
    <PageTransition>
      <SEO
        title={title}
        description={
          isPrivacy
            ? "How this website handles enquiries, local downloads and operational information."
            : "Information about RockValle Resources website content, external links and business enquiries."
        }
        canonical={`/${kind}`}
        noindex
      />
      <PageHero
        kicker={isPrivacy ? "Privacy information" : "Terms of use"}
        title={title + "."}
        intro="Information about this website and its enquiry features."
        compact
      />
      <section className="section">
        <Container className="legal-content">
          <div className="prose">
            {(isPrivacy ? privacy : terms).map((item) => (
              <section key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
