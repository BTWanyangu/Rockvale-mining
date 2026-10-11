import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { EnquiryRateLimiter, deliverEnquiry } from "./contact.mjs";
export function createApp({
  distDirectory,
  transporter = null,
  deliveryReady = false,
  from = "",
  to = "",
  siteUrl = "",
  allowedOrigins = [],
  trustProxy = false,
  rateLimiter = new EnquiryRateLimiter(),
  paths = [],
} = {}) {
  const app = express();
  app.disable("x-powered-by");
  if (trustProxy) app.set("trust proxy", trustProxy);
  const approved = new Set(
    [siteUrl, ...allowedOrigins]
      .filter(Boolean)
      .map((value) => value.replace(/\/$/, "")),
  );
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()",
    );
    // Framer Motion applies inline style transforms; script execution stays same-origin.
    const connect = ["'self'", ...approved].join(" ");
    res.setHeader(
      "Content-Security-Policy",
      `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src ${connect}; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`,
    );
    next();
  });
  app.get("/health", (_req, res) => res.json({ ok: true }));
  app.use(
    "/api",
    cors({
      origin(origin, callback) {
        callback(null, !origin || approved.has(origin));
      },
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    }),
  );
  app.get("/api/contact-config", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.json({ enabled: Boolean(deliveryReady && transporter && from && to) });
  });
  app.use("/api", express.json({ limit: "24kb" }));
  app.post("/api/contact", async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const origin = req.get("Origin");
    const sameOrigin = `${req.protocol}://${req.get("Host")}`;
    if (origin && origin !== sameOrigin && !approved.has(origin))
      return res
        .status(403)
        .json({ ok: false, error: "This origin cannot submit an enquiry." });
    if (!req.is("application/json"))
      return res
        .status(415)
        .json({ ok: false, error: "Submit a JSON enquiry." });
    if (!rateLimiter.allow(req.ip || "unknown")) {
      res.setHeader("Retry-After", "900");
      return res.status(429).json({
        ok: false,
        error: "Too many enquiries. Please try again later.",
      });
    }
    const result = await deliverEnquiry({
      input: req.body,
      transporter: deliveryReady ? transporter : null,
      from,
      to,
    });
    res.status(result.status).json(result.body);
  });
  app.use("/api", (_req, res) =>
    res.status(404).json({ ok: false, error: "API route not found." }),
  );
  if (distDirectory && fs.existsSync(distDirectory)) {
    const known = new Set(paths);
    app.use(
      express.static(distDirectory, {
        index: false,
        redirect: false,
        setHeaders(res, filename) {
          res.setHeader(
            "Cache-Control",
            /-[A-Za-z0-9_-]{8}\.[a-z]+$/.test(filename)
              ? "public, max-age=31536000, immutable"
              : "public, max-age=0, must-revalidate",
          );
        },
      }),
    );
    app.use((req, res, next) => {
      if (req.method !== "GET" && req.method !== "HEAD") return next();
      const pathname = req.path.replace(/\/$/, "") || "/";
      if (known.has(pathname))
        return res.sendFile(
          path.join(
            distDirectory,
            pathname === "/" ? "index.html" : pathname.slice(1),
            pathname === "/" ? "" : "index.html",
          ),
        );
      const missing = path.join(distDirectory, "404.html");
      return res
        .status(404)
        .sendFile(
          fs.existsSync(missing)
            ? missing
            : path.join(distDirectory, "index.html"),
        );
    });
  }
  app.use((_req, res) =>
    res.status(404).json({ ok: false, error: "Not found." }),
  );
  app.use((error, _req, res, _next) => {
    const tooLarge = error?.type === "entity.too.large";
    res.status(tooLarge ? 413 : 400).json({
      ok: false,
      error: tooLarge
        ? "The enquiry is too large."
        : "The request could not be processed.",
    });
  });
  return app;
}
