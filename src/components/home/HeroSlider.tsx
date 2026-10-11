import { useState } from "react";
import { Link } from "react-router-dom";
import { Pause, Play, ArrowDownRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useAutoSlider } from "../../lib/useAutoSlider";
import { getPageImages } from "../../lib/images";
import { services } from "../../data/services";
import Container from "../ui/Container";
import Photo from "../ui/Photo";
import { LinkButton } from "../ui/Button";
const images = [
  getPageImages("home").gallery[0],
  getPageImages("home").gallery[1],
  getPageImages("home").gallery[2],
];
export default function HeroSlider() {
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const reduce = useReducedMotion();
  const { index, goTo } = useAutoSlider({
    length: images.length,
    paused: paused || interacting || Boolean(reduce),
  });
  return (
    <section
      className="hero"
      aria-label="Introduction to RockValle Resources"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          setInteracting(false);
      }}
    >
      <div className="hero-backgrounds" aria-hidden="true">
        {images.map((image, i) => (
          <Photo
            key={image.id}
            image={image}
            priority={i === 0}
            sizes="100vw"
            className={`hero-background ${i === index ? "is-current" : ""}`}
          />
        ))}
      </div>
      <Container className="hero-inner">
        <div className="hero-main">
          <span className="eyebrow">From the ground up</span>
          <h1>
            Resources that
            <br />
            <span>move the world.</span>
          </h1>
          <p className="hero-copy">
            Connecting natural resources with the industries that need them.
            From exploration and mining to trading and the next opportunity.
          </p>
          <div className="hero-actions">
            <LinkButton to="/services">Explore our business</LinkButton>
            <LinkButton to="/about" variant="outline">
              Discover RockValle
            </LinkButton>
            <LinkButton
              to="/gallery"
              variant="outline"
              arrow={false}
              className="hero-gallery-link"
            >
              View gallery
            </LinkButton>
          </div>
        </div>
        <span className="hero-caption">EXPLORATION · MINING · TRADING</span>
        <div className="hero-rail">
          {services.slice(0, 3).map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`}>
              <small>{s.number}</small>
              <div>
                <strong>{s.shortTitle}</strong>
                <span>
                  {s.group === "Discover"
                    ? "Discovering opportunity beneath the surface"
                    : s.group === "Develop"
                      ? "Turning resources into usable materials"
                      : "Connecting supply with industrial demand"}
                </span>
              </div>
              <ArrowDownRight size={20} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="hero-controls" aria-label="Hero photographs">
          {images.map((image, i) => (
            <button
              className={`hero-dot ${i === index ? "active" : ""}`}
              key={image.id}
              aria-label={`Show photograph ${i + 1}: ${image.alt}`}
              aria-pressed={i === index}
              onClick={() => {
                goTo(i);
                setPaused(true);
              }}
            />
          ))}
          <button
            className="hero-pause"
            aria-label={
              paused
                ? "Resume changing hero photographs"
                : "Pause changing hero photographs"
            }
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? (
              <Play size={14} aria-hidden="true" />
            ) : (
              <Pause size={14} aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>
    </section>
  );
}
