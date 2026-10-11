import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Photo from "../ui/Photo";
import { imageById } from "../../lib/images";
import type { Service } from "../../data/services";
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link to={`/services/${service.slug}`} className="business-card">
      <Photo
        image={imageById(service.image)}
        sizes="(max-width: 760px) 50vw, 320px"
      />
      <span className="card-number">
        {service.number} / {service.group.toUpperCase()}
      </span>
      <div className="card-inner">
        <h3>{service.shortTitle}</h3>
        <p>{service.intro}</p>
        <span className="card-link">
          Explore this activity
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
