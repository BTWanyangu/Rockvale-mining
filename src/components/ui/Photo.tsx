import { clsx } from "clsx";
import type { SiteImage } from "../../lib/images";
export default function Photo({
  image,
  className,
  priority = false,
  contain = false,
  sizes = "(max-width: 760px) calc(100vw - 40px), (max-width: 1150px) 50vw, 640px",
}: {
  image: SiteImage;
  className?: string;
  priority?: boolean;
  contain?: boolean;
  sizes?: string;
}) {
  const smallWidth = Math.round(
    image.width * Math.min(360 / image.width, 360 / image.height, 1),
  );
  return (
    <img
      src={image.src}
      srcSet={`${image.thumbnail} ${smallWidth}w, ${image.src} ${image.width}w`}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={clsx("photo", contain && "photo-contain", className)}
    />
  );
}
