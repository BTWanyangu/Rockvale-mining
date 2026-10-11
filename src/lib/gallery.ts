import type { SiteImage } from "./images";
export function filterImages(
  images: SiteImage[],
  category: string,
  query = "",
) {
  const term = query.trim().toLocaleLowerCase();
  return images.filter(
    (image) =>
      (category === "All" || image.category === category) &&
      (!term ||
        `${image.alt} ${image.category}`.toLocaleLowerCase().includes(term)),
  );
}
export function wrapIndex(index: number, count: number) {
  return count > 0 ? ((index % count) + count) % count : 0;
}
