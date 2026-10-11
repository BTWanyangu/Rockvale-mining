import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { createApp } from "./server/app.mjs";
dotenv.config({ quiet: true });
const directory = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8080);
const from = process.env.MAIL_FROM || "";
const to = process.env.MAIL_TO || "";
let transporter = null;
let deliveryReady = false;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const enabled = process.env.CONTACT_ENABLED === "true";
if (
  enabled &&
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  from &&
  to &&
  Number.isFinite(smtpPort)
) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    requireTLS: smtpPort !== 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  try {
    await transporter.verify();
    deliveryReady = true;
  } catch {
    console.error(
      "SMTP verification failed. Enquiry email delivery is disabled.",
    );
  }
}
const routesFile = path.join(directory, "dist/route-manifest.json");
const paths = fs.existsSync(routesFile)
  ? JSON.parse(fs.readFileSync(routesFile, "utf8")).paths
  : [];
const siteUrl = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  ""
).replace(/\/$/, "");
const allowedOrigins = (process.env.CONTACT_ALLOWED_ORIGINS || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const trustProxy = Number(process.env.TRUST_PROXY_HOPS || 0) || false;
const app = createApp({
  distDirectory: path.join(directory, "dist"),
  transporter,
  deliveryReady,
  from,
  to,
  siteUrl,
  allowedOrigins,
  trustProxy,
  paths,
});
const server = app.listen(port, "0.0.0.0", () =>
  console.log(
    `RockValle website running on port ${port}; enquiry delivery ${deliveryReady ? "available" : "disabled"}.`,
  ),
);
process.on("SIGTERM", () => server.close(() => process.exit(0)));
