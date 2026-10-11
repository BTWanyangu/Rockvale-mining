import fs from "node:fs/promises";
import path from "node:path";
import { createServer, loadEnv } from "vite";
const root = process.cwd();
const dist = path.join(root, "dist");
const env = { ...loadEnv("production", root, ""), ...process.env };
const siteUrl = (env.VITE_SITE_URL || "").replace(/\/$/, "");
const indexing = env.VITE_PUBLIC_INDEXING === "true";
if (
  siteUrl &&
  (!/^https?:\/\//.test(siteUrl) || new URL(siteUrl).origin !== siteUrl)
)
  throw new Error("VITE_SITE_URL must be an http(s) origin without a path.");
if (indexing && !siteUrl)
  throw new Error("Provide VITE_SITE_URL before enabling public indexing.");
const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--rr-app-->") || !template.includes("<!--rr-head-->"))
  throw new Error("Missing HTML rendering markers.");
const manifest = JSON.parse(
  await fs.readFile(path.join(dist, ".vite/manifest.json"), "utf8"),
);
const assetMap = Object.entries(manifest)
  .filter(([, v]) => !v.isEntry && v.file)
  .map(([key, value]) => [`/${key}`, `/${value.file}`]);
// Middleware mode is a local module transformer; it opens no preview listener.
const transformer = await createServer({
  root,
  mode: "production",
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  logLevel: "error",
});
try {
  const { render } = await transformer.ssrLoadModule("/src/prerender.tsx");
  const { publicPaths } = await transformer.ssrLoadModule(
    "/src/data/routes.ts",
  );
  const reports = [];
  for (const route of [...publicPaths, "/404"]) {
    const rendered = await render(route);
    let html = template
      .replace("<!--rr-head-->", rendered.head)
      .replace("<!--rr-app-->", rendered.body);
    for (const [source, target] of assetMap)
      html = html.split(source).join(target);
    if (html.includes("/src/assets/"))
      throw new Error(`Unmapped source asset on ${route}`);
    const filename =
      route === "/"
        ? path.join(dist, "index.html")
        : route === "/404"
          ? path.join(dist, "404.html")
          : path.join(dist, route.slice(1), "index.html");
    await fs.mkdir(path.dirname(filename), { recursive: true });
    await fs.writeFile(filename, html);
    reports.push({
      path: route,
      file: path.relative(dist, filename),
      bytes: Buffer.byteLength(html),
      title: html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1],
    });
  }
  await fs.writeFile(
    path.join(dist, "route-manifest.json"),
    JSON.stringify({ paths: publicPaths, pages: reports }, null, 2) + "\n",
  );
  const escaped = (value) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\"/g, "&quot;");
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    (siteUrl
      ? publicPaths
          .filter((r) => !["/privacy", "/terms"].includes(r))
          .map(
            (route) =>
              `  <url><loc>${escaped(siteUrl + (route === "/" ? "/" : route))}</loc></url>`,
          )
          .join("\n")
      : "") +
    "\n</urlset>\n";
  await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);
  await fs.writeFile(
    path.join(dist, "robots.txt"),
    `User-agent: *\n${indexing ? "Allow: /" : "Disallow: /"}\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ""}`,
  );
  console.log(
    `Pre-rendered ${publicPaths.length} pages and the 404 page; indexing ${indexing ? "enabled" : "disabled"}.`,
  );
} finally {
  await transformer.close();
}
