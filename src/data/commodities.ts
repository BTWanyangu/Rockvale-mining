export type Commodity = {
  slug: string;
  symbol: string;
  name: string;
  category: "Metals & minerals" | "Energy";
  image: number;
  intro: string;
  uses: string[];
  chain: string[];
  considerations: string[];
  source: string;
};
export const commodities: Commodity[] = [
  {
    slug: "copper",
    symbol: "Cu",
    name: "Copper",
    category: "Metals & minerals",
    image: 62,
    intro:
      "Copper connects electrical systems, buildings and transport. Its ability to conduct electricity makes it an important material for networks and equipment, while its recoverability gives secondary supply a continuing role.",
    uses: [
      "Electrical wires and power networks",
      "Buildings, machinery and industrial equipment",
      "Transport systems and electronics",
    ],
    chain: [
      "Copper-bearing ore is assessed and prepared for an appropriate processing route.",
      "Concentration, smelting and refining can turn mineral feed into metal products.",
      "Recyclable copper-bearing material can enter suitable recovery processes.",
    ],
    considerations: [
      "Physical form, copper content and impurities",
      "Sampling, analysis and product acceptance",
      "Origin, traceability and handling arrangements",
    ],
    source: "https://www.glencore.com/what-we-do/metals-and-minerals/copper",
  },
  {
    slug: "cobalt",
    symbol: "Co",
    name: "Cobalt",
    category: "Metals & minerals",
    image: 19,
    intro:
      "Cobalt is used in battery materials, high-performance alloys and specialist applications. Its supply chain connects mineral sources with chemical and metallurgical processing, and makes origin and responsible sourcing important commercial questions.",
    uses: [
      "Certain rechargeable battery chemistries",
      "High-temperature alloys",
      "Specialist chemical and industrial uses",
    ],
    chain: [
      "Cobalt can be recovered alongside other metals from mineral feed.",
      "Processing produces intermediates or refined products to suit particular applications.",
      "Suitable secondary feed can contribute to cobalt recovery.",
    ],
    considerations: [
      "Product form and required purity",
      "Source documentation and counterparty checks",
      "Application-specific quality requirements",
    ],
    source: "https://www.glencore.com/what-we-do/metals-and-minerals/cobalt",
  },
  {
    slug: "nickel",
    symbol: "Ni",
    name: "Nickel",
    category: "Metals & minerals",
    image: 26,
    intro:
      "Nickel supports stainless steel, alloys and some battery chemistries. Different applications require different product forms and quality, linking geological characteristics with processing choices and customer specifications.",
    uses: [
      "Stainless steel production",
      "Specialist corrosion-resistant alloys",
      "Certain battery materials",
    ],
    chain: [
      "Mineral feed is evaluated for the appropriate extraction and processing route.",
      "Products can include intermediates, refined nickel or alloying materials.",
      "Secondary nickel-bearing streams can support appropriate recovery pathways.",
    ],
    considerations: [
      "Nickel content and product form",
      "Impurities, moisture and physical characteristics",
      "Delivery specification and analytical method",
    ],
    source: "https://www.glencore.com/what-we-do/metals-and-minerals/nickel",
  },
  {
    slug: "zinc-and-lead",
    symbol: "Zn",
    name: "Zinc & lead",
    category: "Metals & minerals",
    image: 46,
    intro:
      "Zinc helps protect steel through galvanising. Lead remains associated with lead-acid battery applications. These are separate commodities with their own product requirements, processing routes and handling considerations.",
    uses: [
      "Zinc coatings for corrosion protection",
      "Zinc alloys and industrial applications",
      "Lead-acid batteries and specialist uses",
    ],
    chain: [
      "Mineral sources are concentrated and processed into suitable products.",
      "Refining and product preparation depend on the metal and intended application.",
      "Suitable scrap and residues may contribute secondary supply through licensed facilities.",
    ],
    considerations: [
      "Clear distinction between zinc and lead specifications",
      "Composition, impurities and product quality",
      "Applicable storage, transport and exposure controls",
    ],
    source:
      "https://www.glencore.com/what-we-do/metals-and-minerals/zinc-and-lead",
  },
  {
    slug: "ferroalloys",
    symbol: "Fe",
    name: "Ferroalloys",
    category: "Metals & minerals",
    image: 49,
    intro:
      "Ferroalloys provide alloying constituents for steelmaking and related applications. The alloy composition and the customer’s manufacturing process determine the specification, making product quality central to the supply relationship.",
    uses: [
      "Stainless and alloy steel production",
      "Steelmaking composition control",
      "Specialist metallurgical applications",
    ],
    chain: [
      "Mineral and other suitable inputs support alloy production.",
      "Processing establishes the composition and physical characteristics of the alloy.",
      "Products move to customers against an agreed manufacturing specification.",
    ],
    considerations: [
      "Alloy composition and size distribution",
      "Chemical analysis and tolerances",
      "Manufacturing requirements and delivery schedule",
    ],
    source:
      "https://www.glencore.com/what-we-do/metals-and-minerals/ferroalloys",
  },
  {
    slug: "precious-metals-and-gemstones",
    symbol: "Au",
    name: "Precious metals & gemstones",
    category: "Metals & minerals",
    image: 59,
    intro:
      "Precious metals and gemstones connect geological origin with jewellery, industrial and specialist applications. Material identity, quality, provenance and careful evaluation shape their value and commercial pathway.",
    uses: [
      "Jewellery and decorative applications",
      "Industrial uses of precious metals",
      "Specialist products and collectible materials",
    ],
    chain: [
      "Material identity and origin need reliable documentation.",
      "Qualified testing or grading establishes the relevant characteristics.",
      "Commercial discussions use agreed evidence and acceptance requirements.",
    ],
    considerations: [
      "Independent identification and evaluation",
      "Origin, ownership and traceability",
      "Secure handling and documented commercial terms",
    ],
    source: "https://www.usgs.gov/centers/national-minerals-information-center",
  },
  {
    slug: "energy-and-coal",
    symbol: "C",
    name: "Energy & coal",
    category: "Energy",
    image: 26,
    intro:
      "Coal products can serve different markets. Thermal coal is associated with energy generation, while metallurgical coal is used in certain steelmaking routes. Their specifications and market requirements should not be treated as interchangeable.",
    uses: [
      "Energy generation for suitable thermal products",
      "Steelmaking routes using metallurgical coal",
      "Other specification-dependent industrial applications",
    ],
    chain: [
      "Mining and preparation produce material for an identified market.",
      "Testing establishes properties relevant to the intended application.",
      "Storage, handling and logistics connect supply with the receiving facility.",
    ],
    considerations: [
      "Product type and intended use",
      "Agreed analysis and quality specification",
      "Environmental requirements and delivery arrangements",
    ],
    source: "https://www.glencore.com/what-we-do/energy/coal",
  },
];
