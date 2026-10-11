import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { SiteImage } from "../../lib/images";
import Photo from "./Photo";
export default function ImageCarousel({
  images,
  label = "Resource industry photographs",
}: {
  images: SiteImage[];
  label?: string;
}) {
  const [ref, api] = useEmblaCarousel({
    loop: images.length > 1,
    align: "start",
  });
  const [selected, setSelected] = useState(0);
  const onSelect = useCallback(() => {
    if (api) setSelected(api.selectedScrollSnap());
  }, [api]);
  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);
  return (
    <section
      className="image-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="carousel-viewport" ref={ref}>
        <div className="carousel-track">
          {images.map((image, i) => (
            <figure
              className="carousel-slide"
              key={image.id}
              aria-label={`${i + 1} of ${images.length}`}
            >
              <Photo
                image={image}
                contain={image.category === "Mineral guides"}
              />
              <figcaption>
                <span>{image.category}</span>
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <div className="carousel-controls">
          <p>
            Drag to explore{" "}
            <span>
              {String(selected + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          </p>
          <div>
            <button
              className="icon-button"
              aria-label="Previous photograph"
              onClick={() => api?.scrollPrev()}
            >
              <ArrowLeft size={19} aria-hidden="true" />
            </button>
            <button
              className="icon-button"
              aria-label="Next photograph"
              onClick={() => api?.scrollNext()}
            >
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
