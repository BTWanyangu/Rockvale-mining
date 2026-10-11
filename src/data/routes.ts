import { services } from "./services";
import { commodities } from "./commodities";
import { insights } from "./insights";
export const publicPaths = [
  "/",
  "/about",
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  "/operations",
  "/commodities",
  ...commodities.map((c) => `/commodities/${c.slug}`),
  "/sustainability",
  "/governance",
  "/gallery",
  "/insights",
  ...insights.map((i) => `/insights/${i.slug}`),
  "/partners",
  "/contact",
  "/privacy",
  "/terms",
];
