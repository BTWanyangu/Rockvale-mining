import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const root = process.cwd();
const inventory = JSON.parse(
  await fs.readFile(path.join(root, "src/data/assets.json"), "utf8"),
);
const manifest = JSON.parse(
  await fs.readFile(path.join(root, "dist/.vite/manifest.json"), "utf8"),
);
const routes = JSON.parse(
  await fs.readFile(path.join(root, "dist/route-manifest.json"), "utf8"),
);
const pages = await Promise.all(
  routes.pages.map(async (page) => ({
    route: page.path,
    html: await fs.readFile(path.join(root, "dist", page.file), "utf8"),
  })),
);
const entries = [];
for (const asset of inventory) {
  const original = path.join(
    "source-assets/originals",
    asset.original_filename,
  );
  const source = path.posix.normalize(`src/data/${asset.full_path}`);
  const thumbnail = path.posix.normalize(`src/data/${asset.thumbnail_path}`);
  const originalBytes = await fs.readFile(path.join(root, original));
  assert.equal(
    createHash("sha256").update(originalBytes).digest("hex"),
    asset.sha256,
    `Original changed: ${asset.asset_id}`,
  );
  assert(manifest[source]?.file, `Missing built asset: ${source}`);
  assert(manifest[thumbnail]?.file, `Missing thumbnail: ${thumbnail}`);
  const built = `/${manifest[source].file}`;
  const builtThumbnail = `/${manifest[thumbnail].file}`;
  const usedPages = pages
    .filter(
      (page) => page.html.includes(built) || page.html.includes(builtThumbnail),
    )
    .map((page) => page.route);
  assert(usedPages.includes("/gallery"), `Photo omitted: ${asset.asset_id}`);
  entries.push({
    asset_id: asset.asset_id,
    original_filename: asset.original_filename,
    original_path: original,
    organized_path: source,
    thumbnail_path: thumbnail,
    built_path: built,
    built_thumbnail_path: builtThumbnail,
    original_media_type: "image/jpeg",
    published_media_type: "image/webp",
    dimensions: { width: asset.width, height: asset.height },
    original_bytes: originalBytes.length,
    optimized_bytes: (await fs.stat(path.join(root, source))).size,
    thumbnail_bytes: (await fs.stat(path.join(root, thumbnail))).size,
    sha256_original: asset.sha256,
    category: asset.category,
    alt: asset.alt,
    intended_use: `${asset.category} imagery; gallery/lightbox${usedPages.length > 1 ? " and related editorial pages" : ""}`,
    pages: usedPages,
    status: "Original retained; optimized image and thumbnail published",
    excluded: false,
    exclusion_reason: null,
    rights: asset.rights,
  });
}
const totals = entries.reduce(
  (sum, entry) => ({
    originals: sum.originals + entry.original_bytes,
    optimized: sum.optimized + entry.optimized_bytes,
    thumbnails: sum.thumbnails + entry.thumbnail_bytes,
  }),
  { originals: 0, optimized: 0, thumbnails: 0 },
);
const hashes = new Set(entries.map((entry) => entry.sha256_original));
const categories = Object.fromEntries(
  [...new Set(entries.map((entry) => entry.category))].map((category) => [
    category,
    entries.filter((entry) => entry.category === category).length,
  ]),
);
const report = {
  photo_count: entries.length,
  excluded_photos: 0,
  exact_byte_duplicates: entries.length - hashes.size,
  exact_duplicate_groups: [
    ...new Set(entries.map((entry) => entry.sha256_original)),
  ]
    .map((hash) =>
      entries
        .filter((entry) => entry.sha256_original === hash)
        .map((entry) => entry.asset_id),
    )
    .filter((group) => group.length > 1),
  near_duplicate_review: ["RR-21 / RR-23", "RR-32 / RR-42"],
  byte_totals: totals,
  categories,
  method:
    "Original SHA-256 validation; page use derived from production HTML. Gallery lightboxes use the same full-dimension optimized files.",
  assets: entries,
};
const mib = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
const escaped = (value) => String(value).replaceAll("|", "\\|");
const table = entries.map(
  (entry) =>
    `| ${entry.asset_id} | ${escaped(entry.original_filename)} | \`${entry.organized_path}\` | ${entry.dimensions.width} × ${entry.dimensions.height} | ${escaped(entry.category)} — ${escaped(entry.alt)} | ${entry.pages.map((route) => `\`${route}\``).join(", ")} | Retained / optimized; none excluded |`,
);
const markdown = `# Asset inventory

All ${entries.length} supplied WhatsApp images were reviewed and are displayed in the searchable gallery. Originals are preserved byte-for-byte, with verified SHA-256 hashes, under \`source-assets/originals/\`. None were excluded. The published site uses ${entries.length} full-dimension WebP files plus ${entries.length} proportional thumbnails with a maximum 360px edge. Larger originals are not artificially enlarged.

Original images total ${mib(totals.originals)}. Full-dimension WebP files total ${mib(totals.optimized)} and thumbnails ${mib(totals.thumbnails)}. No original is loaded by the published web build. The collection includes mining photographs, material specimens and illustrated mineral guides. Original marks and chart lettering are preserved. Gallery and lightbox views preserve full subjects with contain sizing; mineral charts also use contain sizing in editorial placements.

There are ${report.exact_byte_duplicates} exact byte duplicates (${report.exact_duplicate_groups.map((group) => group.join(" / ")).join(", ") || "none"}). Visual near duplicates RR-21 / RR-23 and RR-32 / RR-42 are also retained for completeness. Every image has descriptive subject-based alt text and a meaningful category. The user approved the supplied imagery and content for website use in this revision. No project names or geographic attributions were added.

\`docs/asset-inventory.json\` provides the complete machine-readable inventory: original and organized paths, media types, dimensions, hashes, byte sizes, built filenames, intended uses, exact production-page usage, status and rights notes. The table below is generated from the same data after each build. The source registry uses \`src/data/assets.json\`; its paths are relative to that registry and resolved centrally by \`src/lib/images.ts\`.

| ID | Original JPEG filename | Organized WebP path | Source dimensions | Category and intended subject | Pages where used | Treatment |
| --- | --- | --- | --- | --- | --- | --- |
${table.join("\n")}

## Branding and source references

The user selected **RockValle Resources** as the final brand spelling. The header and footer use the original RR monogram through the cropped vector viewport in \`src/assets/shared/logo/rockvalle-mark.svg\`; their wordmark reads ROCKVALLE / RESOURCES. The complete updated logo is available in \`public/assets/branding/rockvalle-resources.svg\` and \`rockvalle-resources.png\`. The favicon uses the same monogram. The previous public logo files were removed. No externally hosted stock photograph was added.

The RR HTML and WiseWastes ZIP served as design and architecture references; they are not copied into the published site. WiseWastes branding, credentials, Git history and unused template images are excluded. No supplied RR image was excluded.
`;
await fs.mkdir(path.join(root, "docs"), { recursive: true });
await fs.writeFile(
  path.join(root, "docs/asset-inventory.json"),
  JSON.stringify(report, null, 2) + "\n",
);
await fs.writeFile(path.join(root, "docs/ASSET-INVENTORY.md"), markdown);
console.log(
  `Inventory verified: ${entries.length} preserved originals and ${entries.length} gallery photographs.`,
);
