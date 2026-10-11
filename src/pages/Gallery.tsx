import { useMemo, useState } from "react";
import { Search, Maximize2 } from "lucide-react";
import { allImages } from "../lib/images";
import { filterImages } from "../lib/gallery";
import PageTransition from "../components/ui/PageTransition";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Photo from "../components/ui/Photo";
import Lightbox from "../components/ui/Lightbox";
import CTA from "../components/ui/CTA";
const categories = [
  "All",
  "Underground",
  "Surface",
  "Equipment",
  "Materials",
  "Mineral guides",
  "People & environment",
];
export default function Gallery() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const images = useMemo(
    () => filterImages(allImages, category, query),
    [category, query],
  );
  const selected = images.findIndex((i) => i.id === selectedId);
  return (
    <PageTransition>
      <SEO
        title="Resource industry gallery"
        description={`Explore ${allImages.length} images of mining environments, equipment, materials, mineral charts and the people around resource activity.`}
        canonical="/gallery"
      />
      <PageHero
        kicker="Resource gallery"
        title="A closer view. From every angle."
        intro="Explore mining environments, equipment, mineral specimens and illustrated geological guides. Select an image for a full view."
      />
      <section className="section">
        <Container>
          <div className="filter-bar gallery-filters">
            <div className="filter-chips" aria-label="Image categories">
              {categories.map((c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  onClick={() => {
                    setCategory(c);
                    setSelectedId(null);
                  }}
                >
                  {c}
                  <span>
                    {c === "All"
                      ? allImages.length
                      : allImages.filter((i) => i.category === c).length}
                  </span>
                </button>
              ))}
            </div>
            <label className="search-field">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Search images</span>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedId(null);
                }}
                placeholder="Search the gallery"
              />
            </label>
          </div>
          <p className="results-note" aria-live="polite">
            Showing {images.length} of {allImages.length} images
          </p>
          <div className="gallery-grid">
            {images.map((image) => (
              <figure className="gallery-card" key={image.id}>
                <button
                  onClick={() => setSelectedId(image.id)}
                  aria-label={`Open image: ${image.alt}`}
                >
                  <Photo image={image} contain />
                  <span className="gallery-expand" aria-hidden="true">
                    <Maximize2 size={20} />
                  </span>
                </button>
                <figcaption>
                  <span>{image.category}</span>
                  {image.alt}
                </figcaption>
              </figure>
            ))}
          </div>
          {images.length === 0 && (
            <div className="empty-state">
              <h2>No images found.</h2>
              <p>Try a different word or view all categories.</p>
              <button
                className="btn dark"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
          <Lightbox
            images={images}
            selected={selected}
            onSelect={(n) => setSelectedId(images[n].id)}
            onClose={() => setSelectedId(null)}
          />
        </Container>
      </section>
      <CTA
        title="Explore the resource story."
        description="Explore the geological, operational and commercial questions behind the resource industry."
        to="/operations"
        label="Follow the value chain"
      />
    </PageTransition>
  );
}
