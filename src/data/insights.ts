export type Insight = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  image: number;
  readingTime: string;
  sections: { title: string; paragraphs: string[] }[];
  sources: { label: string; url: string }[];
};
export const insights: Insight[] = [
  {
    slug: "why-copper-matters",
    category: "Metals & minerals",
    title: "Why copper matters to an electrified world.",
    summary:
      "A closer look at the material connecting power, infrastructure and everyday technology.",
    image: 16,
    readingTime: "3 min read",
    sections: [
      {
        title: "A material at the point of connection",
        paragraphs: [
          "Electricity is useful only when it can move from generation to the place it is needed. Conductive materials are part of that connection. Copper appears in wiring, equipment and other components because its properties suit many electrical applications.",
          "Those applications reach well beyond a single industry. Buildings, transport, industrial machinery and electronics all use electrical connections. Understanding copper therefore means looking at both the material itself and the systems in which it is used.",
        ],
      },
      {
        title: "From a mineral source to an agreed product",
        paragraphs: [
          "A copper-bearing rock is not the same thing as a finished copper product. Between the deposit and the end user lie assessment, extraction and an appropriate processing route. Product form and quality need to match the application.",
          "For a buyer, the useful question is more specific than whether copper is available. Composition, form, quantity, origin and delivery requirements define the actual need. Reliable analysis and clear acceptance terms turn a broad commodity enquiry into a practical commercial discussion.",
        ],
      },
      {
        title: "Consider primary and secondary supply",
        paragraphs: [
          "Copper-bearing secondary materials can contribute to supply when suitable recovery routes are available. Their composition, consistency and handling requirements need evaluation just as primary materials do. Recycling is a technical and commercial process, rather than an automatic outcome for every material stream.",
          "A longer view of copper brings production, use and recovery into the same conversation. Understanding the physical form, composition and receiving application helps identify how a material can contribute to that lifecycle.",
        ],
      },
    ],
    sources: [
      {
        label: "Glencore: Copper",
        url: "https://www.glencore.com/what-we-do/metals-and-minerals/copper",
      },
    ],
  },
  {
    slug: "from-mine-to-market",
    category: "Commodity supply",
    title: "From the mine to the market.",
    summary:
      "How preparation, quality and physical logistics connect a resource with industrial demand.",
    image: 44,
    readingTime: "3 min read",
    sections: [
      {
        title: "Follow the material, not just the transaction",
        paragraphs: [
          "Commodity supply is a physical activity as well as a commercial one. A material must reach the right place, in the right form and against the right specification. An agreement on price does not, by itself, resolve handling, quality or delivery.",
          "The first step is a useful product description. Origin, physical characteristics, analytical information and available quantity help establish what is being offered. The buyer’s intended application determines which requirements need to be checked.",
        ],
      },
      {
        title: "Make quality and custody explicit",
        paragraphs: [
          "Sampling and inspection arrangements help both parties work from a common basis. The contract should identify the relevant tests, acceptance criteria and the point at which quality is assessed. This makes a later variation easier to investigate.",
          "Custody, ownership and commercial responsibility can change at agreed points along the route. Clear records support those handovers. The applicable contractual and regulatory details depend on the particular product and movement, and should be confirmed with appropriate advisers.",
        ],
      },
      {
        title: "Treat logistics as part of the specification",
        paragraphs: [
          "Loading facilities, vehicle access, storage conditions, packaging and the receiving site’s capacity influence delivery. These details belong in the initial brief, because they can affect which supply options are workable.",
          "A practical enquiry explains the commodity, the required specification, the quantity, the destination and the timetable together. RockValle’s trading perspective connects these details with the practical route from supplier to customer.",
        ],
      },
    ],
    sources: [
      {
        label: "Glencore: Marketing",
        url: "https://www.glencore.com/what-we-do/marketing",
      },
    ],
  },
  {
    slug: "a-second-life-for-materials",
    category: "Circular resources",
    title: "A second life for valuable materials.",
    summary:
      "Why composition, sampling and the receiving process matter to material recovery.",
    image: 19,
    readingTime: "3 min read",
    sections: [
      {
        title: "Value begins with knowing the material",
        paragraphs: [
          "A discarded or secondary material can still contain useful constituents. Establishing what is present, in what form and at what concentration is the beginning of a recovery assessment. Photographs can support that discussion, but appearance alone is not a reliable measure of composition or value.",
          "Sampling and analysis help define a more useful material description. Variability across a stream matters: one selected sample may not represent all the available material. The appropriate sampling approach depends on the stream and the decisions it will support.",
        ],
      },
      {
        title: "Recovery needs an appropriate destination",
        paragraphs: [
          "A recovery route must suit the input and produce an output with an identified use. Facilities differ in what they can accept and how they process material. Residues, contaminants and potential hazards need consideration alongside the recoverable constituents.",
          "Classification, transport and documentation requirements may also affect a proposed movement. These need confirmation in the relevant jurisdiction. A potential commercial return does not replace the requirement for suitable handling and authorised processing.",
        ],
      },
      {
        title: "Define a useful partnership brief",
        paragraphs: [
          "A clear recovery enquiry brings together the source, quantity, composition, current handling arrangements and desired outcome. Existing analysis and documentation can help identify the questions that remain open.",
          "A focused partnership brief connects the material with a suitable receiving process. Clear analytical information, volumes and objectives help technical and commercial partners evaluate the opportunity together.",
        ],
      },
    ],
    sources: [
      {
        label: "Glencore: Recycling",
        url: "https://www.glencore.com/what-we-do/recycling",
      },
    ],
  },
];
