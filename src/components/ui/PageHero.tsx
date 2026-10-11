import { Link } from "react-router-dom";
import Container from "./Container";
import Photo from "./Photo";
import type { SiteImage } from "../../lib/images";
export default function PageHero({
  kicker,
  title,
  intro,
  image,
  parent,
  compact = false,
}: {
  kicker: string;
  title: string;
  intro: string;
  image?: SiteImage;
  parent?: { label: string; to: string };
  compact?: boolean;
}) {
  return (
    <section
      className={`page-hero ${image ? "page-hero-photo" : ""} ${compact ? "page-hero-compact" : ""}`}
    >
      {image && (
        <Photo
          image={image}
          priority
          className="page-hero-image"
          sizes="100vw"
        />
      )}
      <Container className="page-hero-inner">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          {parent && (
            <>
              <Link to={parent.to}>{parent.label}</Link>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span aria-current="page">{kicker}</span>
        </nav>
        <span className="eyebrow">{kicker}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </Container>
    </section>
  );
}
