import { ArrowUp } from "lucide-react";
import { useScrollThreshold } from "../../lib/useScrollThreshold";
export default function BackToTop() {
  const show = useScrollThreshold(600);
  return show ? (
    <button
      className="back-top"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        })
      }
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  ) : null;
}
