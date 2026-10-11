import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { insights } from "../../data/insights";
import { imageById } from "../../lib/images";
import Photo from "../ui/Photo";
export default function InsightCards() {
  return (
    <div className="stories-grid">
      {insights.map((i) => (
        <article className="story" key={i.slug}>
          <Link to={`/insights/${i.slug}`} tabIndex={-1} aria-hidden="true">
            <Photo image={imageById(i.image)} className="story-visual" />
          </Link>
          <span className="story-category">{i.category}</span>
          <h3>
            <Link to={`/insights/${i.slug}`}>{i.title}</Link>
          </h3>
          <p>{i.summary}</p>
          <Link className="text-link" to={`/insights/${i.slug}`}>
            Read the insight <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}
