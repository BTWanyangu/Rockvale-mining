import "./FloatingWhatsApp.css";

// Kenya: 0700750090 becomes 254700750090 in the WhatsApp link.
const WHATSAPP_NUMBER = "254700750090";
const MESSAGE =
  "Hello RockValle Resources, I would like to make an enquiry.";

export default function FloatingWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      className="whatsapp-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RockValle Resources on WhatsApp (opens in a new tab)"
    >
      <span className="whatsapp-float__label" aria-hidden="true">
        Chat on WhatsApp
      </span>
      <img
        src="/assets/icons/whatsapp-floating.svg"
        width={64}
        height={64}
        alt=""
        aria-hidden="true"
        decoding="async"
      />
    </a>
  );
}
