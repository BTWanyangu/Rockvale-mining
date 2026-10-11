import { X, ArrowLeft, ArrowRight } from "lucide-react";
import type { SiteImage } from "../../lib/images";
import { useDialog } from "../../lib/useDialog";
import { wrapIndex } from "../../lib/gallery";
import Photo from "./Photo";
export default function Lightbox({
  images,
  selected,
  onSelect,
  onClose,
}: {
  images: SiteImage[];
  selected: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}) {
  const open = selected >= 0;
  const ref = useDialog(open);
  const image = open ? images[selected] : null;
  const move = (delta: number) =>
    onSelect(wrapIndex(selected + delta, images.length));
  return (
    <dialog
      className="lightbox"
      ref={ref}
      aria-label="Photograph viewer"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          move(-1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          move(1);
        }
      }}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          onClose();
      }}
    >
      {image && (
        <>
          <div className="lightbox-top">
            <span>
              {image.category} · {selected + 1} / {images.length}
            </span>
            <button
              className="icon-button"
              aria-label="Close photograph viewer"
              onClick={onClose}
              autoFocus
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <div className="lightbox-image">
            <Photo
              image={image}
              priority
              contain
              sizes="(max-width:760px) 92vw, 1000px"
            />
          </div>
          <div className="lightbox-bottom">
            <p>
              {image.alt}
              <small>RockValle Resources gallery</small>
            </p>
            <div>
              <button
                className="icon-button"
                aria-label="Previous photograph"
                onClick={() => move(-1)}
              >
                <ArrowLeft aria-hidden="true" />
              </button>
              <button
                className="icon-button"
                aria-label="Next photograph"
                onClick={() => move(1)}
              >
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
