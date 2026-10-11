import { Link } from "react-router-dom";
import { getSharedImage } from "../../lib/images";
const logo = getSharedImage("logo");
export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      className="brand"
      aria-label="RockValle Resources home"
      onClick={onClick}
    >
      <span
        className="brand-mark"
        aria-hidden="true"
        style={{ backgroundImage: `url(${logo?.src})` }}
      />
      <span className="brand-text">
        <b>ROCKVALLE</b>
        <span>R E S O U R C E S</span>
      </span>
    </Link>
  );
}
