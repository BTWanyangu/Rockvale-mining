import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { createApp } from "../server/app.mjs";
const root = process.cwd();
const dist = path.join(root, "dist");
const manifest = JSON.parse(
  await fs.readFile(path.join(dist, "route-manifest.json"), "utf8"),
);
const app = createApp({ distDirectory: dist, paths: manifest.paths });
const server = app.listen(0, "127.0.0.1");
await new Promise((resolve) => server.once("listening", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let checked = 0;
try {
  for (const route of manifest.paths) {
    const result = await fetch(base + route);
    assert.equal(result.status, 200, route);
    const html = await result.text();
    const page = manifest.pages.find((p) => p.path === route);
    assert(html.includes(page.title), `Wrong rendered page at ${route}`);
    assert(
      result.headers
        .get("content-security-policy")
        ?.includes("frame-ancestors 'none'"),
    );
    checked++;
  }
  const nested = await fetch(`${base}/services/mining-and-processing/`);
  assert.equal(nested.status, 200);
  assert((await nested.text()).includes("From resource to usable material."));
  const missing = await fetch(`${base}/unknown-page`);
  assert.equal(missing.status, 404);
  assert((await missing.text()).includes("Page not found"));
  const config = await fetch(`${base}/api/contact-config`);
  assert.equal((await config.json()).enabled, false);
  const health = await fetch(`${base}/health`);
  assert.equal(health.status, 200);
  const favicon = await fetch(`${base}/favicon.svg`);
  assert.equal(favicon.status, 200);
  assert.match(favicon.headers.get("content-type"), /svg/);
  const entry = JSON.parse(
    await fs.readFile(path.join(dist, ".vite/manifest.json"), "utf8"),
  );
  const css = entry["index.html"].css[0];
  const asset = await fetch(`${base}/${css}`);
  assert.equal(asset.status, 200);
  assert.match(asset.headers.get("content-type"), /text\/css/);
  assert(asset.headers.get("cache-control")?.includes("immutable"));
  const post = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test Sender",
      email: "sender@example.test",
      organisation: "",
      phone: "",
      type: "General enquiry",
      message:
        "Please discuss this resource opportunity with the information available.",
      website: "",
      consent: true,
    }),
  });
  assert.equal(post.status, 503);
  await fs.writeFile(
    path.join(root, "docs/server-check-results.json"),
    JSON.stringify(
      {
        publicRoutes: checked,
        nestedRefresh: "PASS",
        unknownRouteStatus: 404,
        deliveryWithoutCredentials: "DISABLED (503)",
        securityHeaders: "PASS",
        staticAssets: "PASS",
        status: "PASS",
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    `PASS: HTTP checks for ${checked} production routes, nested-route refresh, 404, assets and disabled enquiry delivery.`,
  );
} finally {
  await new Promise((resolve) => server.close(resolve));
}
