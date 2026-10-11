import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
const root = process.cwd();
const dist = path.join(root, "dist");
const report = JSON.parse(
  await fs.readFile(path.join(dist, "route-manifest.json"), "utf8"),
);
const allowed = new Set([...report.paths, "/404"]);
const titles = new Set();
let links = 0;
let assets = 0;
const decode = (s) => s.replaceAll("&amp;", "&");
for (const page of report.pages) {
  const html = await fs.readFile(path.join(dist, page.file), "utf8");
  assert(
    !html.includes("<!--rr-app-->") && !html.includes("/src/assets/"),
    `Unprocessed source: ${page.path}`,
  );
  assert(
    (html.match(/<h1(?:\s|>)/g) || []).length === 1,
    `Expected one h1: ${page.path}`,
  );
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert(
    main && /<h1(?:\s|>)/.test(main),
    `Page content absent from main: ${page.path}`,
  );
  assert(
    !html.includes('class="route-loading wrap"') &&
      !/<div hidden id="S:/.test(html),
    `Unresolved loading fallback: ${page.path}`,
  );
  for (const script of html.matchAll(/<script\b([^>]*)>/g))
    assert(
      /\bsrc=/.test(script[1]) ||
        /\btype="application\/ld\+json"/.test(script[1]),
      `Unexpected inline executable script: ${page.path}`,
    );
  assert(
    !html.includes('class="utility"') && !html.includes('class="content-note"'),
    `Removed header strip or disclaimer on ${page.path}`,
  );
  assert(
    html.includes("RockValle Resources"),
    `Missing corrected branding: ${page.path}`,
  );
  assert(html.includes('lang="en"'), `Missing English language: ${page.path}`);
  assert(
    /<meta[^>]*name="description"[^>]*content="[^"]{25,}"/.test(html),
    `Missing description: ${page.path}`,
  );
  assert(
    page.title && !titles.has(page.title),
    `Missing or repeated title: ${page.path}`,
  );
  titles.add(page.title);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
    const href = decode(match[1]);
    if (/^(?:https?:|mailto:|tel:|data:)/.test(href)) continue;
    if (href.startsWith("#")) {
      assert(ids.has(href.slice(1)), `Missing anchor ${href} on ${page.path}`);
      continue;
    }
    const url = new URL(href, `https://check.invalid${page.path}`);
    const target = url.pathname.replace(/\/$/, "") || "/";
    if (
      target.startsWith("/assets/") ||
      /\.(?:css|svg|jpeg|png|ico|webp)$/.test(target)
    ) {
      await fs.access(path.join(dist, target.slice(1)));
      assets++;
    } else {
      assert(allowed.has(target), `Broken link ${href} on ${page.path}`);
      links++;
    }
  }
  for (const match of html.matchAll(
    /(?:\bsrc|\bsrcSet|\bsrcset|imagesrcset|imageSrcSet)="([^"]+)"/g,
  )) {
    for (const entry of decode(match[1]).split(",")) {
      const src = entry.trim().split(/\s+/)[0];
      if (!src || src.startsWith("data:") || src.startsWith("http")) continue;
      await fs.access(path.join(dist, src.replace(/^\//, "")));
      assets++;
    }
  }
  for (const match of html.matchAll(/url\(([^)]+)\)/g)) {
    const src = decode(match[1]).replace(/["']/g, "");
    if (src.startsWith("/assets/")) {
      await fs.access(path.join(dist, src.slice(1)));
      assets++;
    }
  }
  assert(
    !/wisewaste\.co|wisewastes\.onrender|rockville|rockvale(?!l)|vite\.svg/i.test(
      html,
    ),
    `Reference brand leaked into ${page.path}`,
  );
}
const inventory = JSON.parse(
  await fs.readFile(path.join(root, "src/data/assets.json"), "utf8"),
);
const gallery = await fs.readFile(
  path.join(dist, "gallery/index.html"),
  "utf8",
);
assert.equal(
  (gallery.match(/class="gallery-card"/g) || []).length,
  inventory.length,
);
await fs.writeFile(
  path.join(root, "docs/build-check-results.json"),
  JSON.stringify(
    {
      pages: report.pages.length,
      publicRoutes: report.paths.length,
      uniqueTitles: titles.size,
      internalLinkReferences: links,
      assetReferences: assets,
      galleryImages: inventory.length,
      visibleInitialContent: "PASS",
      inlineExecutableScripts: 0,
      status: "PASS",
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `PASS: ${report.paths.length} public routes + 404, ${links} internal links, ${assets} asset references, ${inventory.length} gallery images.`,
);
