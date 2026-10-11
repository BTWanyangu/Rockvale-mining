import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpRight } from "lucide-react";
import { commodities } from "../data/commodities";
import { imageById } from "../lib/images";
import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Photo from "../components/ui/Photo";
import CTA from "../components/ui/CTA";
import SectionTitle from "../components/ui/SectionTitle";
export default function Commodities() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      commodities.filter(
        (c) =>
          (category === "All" || c.category === category) &&
          `${c.name} ${c.intro} ${c.uses.join(" ")}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [category, query],
  );
  return (
    <PageTransition>
      <SEO
        title="Commodity guide"
        description="Explore the uses, supply chains and commercial considerations of metals, minerals and energy commodities."
        canonical="/commodities"
      />
      <PageHero
        kicker="Commodity guide"
        title="The building blocks of modern life."
        intro="Understand the materials behind infrastructure, manufacturing, energy and mobility."
      />
      <section className="section">
        <Container>
          <div className="filter-bar">
            <div className="filter-chips" aria-label="Commodity categories">
              {["All", "Metals & minerals", "Energy"].map((c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="search-field">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Search the commodity guide</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search materials or applications"
              />
            </label>
          </div>
          <p className="results-note" aria-live="polite">
            {filtered.length}{" "}
            {filtered.length === 1 ? "commodity guide" : "commodity guides"}
          </p>
          <div className="commodity-cards">
            {filtered.map((c) => (
              <Link
                className="commodity-card"
                key={c.slug}
                to={`/commodities/${c.slug}`}
              >
                <div className="commodity-card-visual">
                  {typeof c.image === "number" ? (
                    <Photo
                      image={imageById(c.image)}
                      contain={imageById(c.image).category === "Mineral guides"}
                    />
                  ) : (
                    <img
                      src={c.image.src}
                      alt={c.image.alt}
                      width={c.image.width}
                      height={c.image.height}
                      loading="lazy"
                      decoding="async"
                      className="photo photo-contain"
                    />
                  )}
                  {typeof c.image === "number" && (
                    <span className="element">{c.symbol}</span>
                  )}
                </div>
                <div>
                  <span className="story-category">{c.category}</span>
                  <h2>{c.name}</h2>
                  <p>{c.intro}</p>
                  <span className="card-link">
                    Explore the guide
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <h2>No matching materials.</h2>
              <p>Try a broader search or explore all categories.</p>
              <button
                className="btn dark"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </Container>
      </section>
      <section className="section surface-section">
        <Container>
          <div className="section-top">
            <SectionTitle
              kicker="Minerals in focus"
              title="See the geology. Explore the materials."
            />
            <p>
              Discover mineral families, rock types and the geological features
              behind gold and copper.
            </p>
          </div>
          <div className="mineral-library">
            {[55, 57, 60, 62, 63, 65].map((id) => {
              const image = imageById(id);
              return (
                <Link
                  to="/gallery"
                  className="mineral-guide-card"
                  key={image.id}
                >
                  <Photo image={image} contain />
                  <div>
                    <span className="story-category">Mineral guides</span>
                    <h3>{image.alt}</h3>
                    <span className="card-link">
                      Explore the gallery{" "}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
      <CTA
        title="Have a specific material in mind?"
        description="A useful enquiry includes the material’s form, composition, quantity, origin and intended application."
      />
    </PageTransition>
  );
}
