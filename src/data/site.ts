export const site = {
  name: "RockValle Resources",
  shortName: "RockValle",
  tagline: "Exploration · Mining · Trading",
  url: (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, ""),
  email: (import.meta.env.VITE_CONTACT_EMAIL ?? "").trim(),
  phone: (import.meta.env.VITE_CONTACT_PHONE ?? "").trim(),
  address: (import.meta.env.VITE_CONTACT_ADDRESS ?? "").trim(),
  hours: (import.meta.env.VITE_CONTACT_HOURS ?? "").trim(),
  indexing: import.meta.env.VITE_PUBLIC_INDEXING === "true",
};
export type NavItem = {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
};
export const nav: NavItem[] = [
  {
    label: "Who we are",
    to: "/about",
    children: [
      { label: "About RockValle", to: "/about" },
      { label: "The resource value chain", to: "/operations" },
      { label: "Governance & ethics", to: "/governance" },
    ],
  },
  {
    label: "What we do",
    to: "/services",
    children: [
      { label: "Our business", to: "/services" },
      {
        label: "Exploration & development",
        to: "/services/exploration-and-development",
      },
      { label: "Mining & processing", to: "/services/mining-and-processing" },
      {
        label: "Trading & distribution",
        to: "/services/trading-and-distribution",
      },
      {
        label: "Recycling & recovery",
        to: "/services/recycling-and-recovery",
      },
    ],
  },
  { label: "Commodities", to: "/commodities" },
  { label: "Sustainability", to: "/sustainability" },
  {
    label: "Insights",
    to: "/insights",
    children: [
      { label: "Insights & stories", to: "/insights" },
      { label: "Resource industry gallery", to: "/gallery" },
    ],
  },
];
