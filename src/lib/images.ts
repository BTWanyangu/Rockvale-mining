import inventory from "../data/assets.json";
export type SiteImage = {
  id: string;
  src: string;
  thumbnail: string;
  alt: string;
  category: string;
  width: number;
  height: number;
};
const modules = import.meta.glob<string>(
  "../assets/**/*.{jpg,jpeg,png,webp,avif,svg}",
  { eager: true, query: "?url", import: "default" },
);
export const allImages: SiteImage[] = inventory.map((asset) => {
  const src = modules[asset.full_path];
  const thumbnail = modules[asset.thumbnail_path];
  if (!src || !thumbnail) throw new Error(`Missing photo ${asset.asset_id}`);
  return {
    id: asset.asset_id,
    src,
    thumbnail,
    alt: asset.alt,
    category: asset.category,
    width: asset.width,
    height: asset.height,
  };
});
export function imageById(n: number): SiteImage {
  const found = allImages.find(
    (image) => image.id === `RR-${String(n).padStart(2, "0")}`,
  );
  if (!found) throw new Error(`Unknown photo ${n}`);
  return found;
}
export function getPageImages(page: string): {
  hero: SiteImage[];
  gallery: SiteImage[];
} {
  const map: Record<string, number[]> = {
    home: [2, 18, 36],
    about: [36, 34, 5, 53],
    operations: [18, 30, 31, 44, 49, 54],
    sustainability: [15, 8, 13, 21, 25, 33, 34, 40],
    contact: [17, 9],
    commodities: [62, 59, 55, 57, 60, 63, 65],
    exploration: [11, 10, 24, 37, 56, 61, 63, 64, 65],
    mining: [5, 1, 4, 12, 20, 22, 28, 53],
    trading: [44, 7, 31, 52],
    recovery: [16, 19, 26, 46],
  };
  const photos =
    page === "gallery" ? allImages : (map[page] ?? []).map(imageById);
  return { hero: photos.slice(0, 1), gallery: photos };
}
export function getServiceImages(slug: string) {
  const lookup: Record<string, string> = {
    "exploration-and-development": "exploration",
    "mining-and-processing": "mining",
    "trading-and-distribution": "trading",
    "recycling-and-recovery": "recovery",
  };
  return getPageImages(lookup[slug] ?? "gallery");
}
export function getSharedImage(
  group: string,
): { src: string; alt: string } | null {
  const entry = Object.entries(modules).find(([path]) =>
    path.startsWith(`../assets/shared/${group}/`),
  );
  return entry ? { src: entry[1], alt: "RockValle Resources" } : null;
}
