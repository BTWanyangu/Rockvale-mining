export type ServiceSection = {
  title: string;
  paragraphs: string[];
  points?: string[];
};
export type Service = {
  slug: string;
  shortTitle: string;
  title: string;
  number: string;
  image: number;
  group: string;
  intro: string;
  overview: string;
  sections: ServiceSection[];
  enquiry: string[];
};
export const services: Service[] = [
  {
    slug: "exploration-and-development",
    shortTitle: "Exploration & development",
    title: "Opportunity starts with understanding.",
    number: "01",
    image: 11,
    group: "Discover",
    intro:
      "From the first geological question to a considered development decision, exploration turns uncertainty into evidence.",
    overview:
      "Exploration is the starting point of the resource value chain. Geological information, representative sampling and careful evaluation help establish what may be present, what remains uncertain and which questions a development study must resolve.",
    sections: [
      {
        title: "Read the ground before defining the opportunity",
        paragraphs: [
          "A mineral occurrence is not the same as an economically workable deposit. The geology, continuity, grade and physical setting all shape the opportunity. Exploration begins by bringing together existing records and field evidence, then identifying the information needed to test a geological interpretation.",
          "Mapping, sampling, surveys and drilling can contribute different kinds of evidence. Their suitability depends on the deposit, access conditions and the permissions required. The aim is a coherent understanding of the resource rather than a collection of disconnected results.",
        ],
        points: [
          "Geological setting and available historical information",
          "Sampling context, location records and laboratory results",
          "Data quality, uncertainty and interpretation",
        ],
      },
      {
        title: "Make evaluation a disciplined process",
        paragraphs: [
          "Useful exploration information is traceable. Sample identity, location, preparation and analytical methods matter because commercial decisions can depend on the reliability of the underlying data. Independent laboratory work and qualified technical review are part of the wider evaluation process.",
          "Resource estimates, economic assumptions and development studies are separate stages of work. A promising result does not, on its own, establish project feasibility or justify a production forecast. Any formal reporting should follow the applicable rules and be prepared by suitably qualified professionals.",
        ],
      },
      {
        title: "Connect geology with development realities",
        paragraphs: [
          "The next question is how an opportunity could be developed responsibly. Access, land rights, water, power, infrastructure and potential markets influence the practical route. Environmental and social conditions need consideration alongside technical and financial questions.",
          "Development planning should identify constraints early, compare reasonable options and make the assumptions visible. A clear project brief helps technical specialists, owners and commercial partners discuss the same opportunity using the same evidence.",
        ],
        points: [
          "Land access, permissions and project boundaries",
          "Infrastructure, processing options and logistics",
          "Environmental, community and commercial considerations",
        ],
      },
      {
        title: "Start a focused exploration discussion",
        paragraphs: [
          "A useful initial conversation sets out the location, the current development stage and the information already available. Maps, sample results, ownership documentation and the intended partnership structure help define the questions that need to be answered.",
          "RockValle brings an exploration perspective to the conversation, connecting geological evidence with development objectives, project constraints and partnership opportunities.",
        ],
      },
    ],
    enquiry: [
      "Location and project stage",
      "Ownership or authority to represent the opportunity",
      "Available geological and analytical information",
      "Development objectives and the proposed form of partnership",
    ],
  },
  {
    slug: "mining-and-processing",
    shortTitle: "Mining & processing",
    title: "From resource to usable material.",
    number: "02",
    image: 18,
    group: "Develop",
    intro:
      "Mining and processing connect the characteristics of a deposit with the specifications a material must meet.",
    overview:
      "Extraction is one part of a much wider system. Mine planning, material movement, processing, quality control and the management of operational impacts all influence how a resource becomes a marketable product.",
    sections: [
      {
        title: "Choose the route around the resource",
        paragraphs: [
          "Surface and underground mining suit different geological and physical settings. The position of the deposit, rock conditions, access and economic assumptions affect the method. The choice also influences infrastructure needs, operational risks and the way land is disturbed.",
          "Production plans bring geology and engineering together. Material movement, equipment suitability and maintenance work as a connected system, with each stage supporting the next.",
        ],
        points: [
          "Deposit geometry and physical conditions",
          "Access, material movement and equipment requirements",
          "Qualified engineering review and operating controls",
        ],
      },
      {
        title: "Match processing to material characteristics",
        paragraphs: [
          "Different materials require different preparation and separation routes. Crushing, screening, concentration and further treatment may form part of a processing chain, depending on mineralogy and the required output. A route suitable for one feed cannot be assumed to suit another.",
          "Representative testing helps establish recovery potential, product quality and the characteristics of residues. It also supports a more realistic understanding of resource use, costs and the controls required. Processing claims should be supported by actual test work and facility information.",
        ],
      },
      {
        title: "Keep quality visible through the workflow",
        paragraphs: [
          "A product specification connects the producer with the customer. Grade or composition, moisture, size distribution and other agreed properties may affect handling, pricing and acceptance. Sampling plans and laboratory methods therefore belong in the commercial discussion as well as the operating plan.",
          "Traceable records make it easier to investigate a variation, reconcile material movements and resolve an acceptance question. Quality is most useful when the requirements are agreed before production or shipment, rather than after a consignment arrives.",
        ],
        points: [
          "Agreed sampling and testing approach",
          "Product specifications and acceptance criteria",
          "Material identification, records and reconciliation",
        ],
      },
      {
        title: "Consider the full operating lifecycle",
        paragraphs: [
          "Workplace safety, water management, waste rock, tailings and closure planning are connected responsibilities. Their relevance and the applicable requirements vary by operation. Qualified assessment and site-specific controls are essential; general website information cannot substitute for them.",
          "To discuss a mining or processing opportunity with RockValle, describe the material, its location, the current stage of work and the output being sought. A clear brief connects the resource with the equipment, processing and logistics requirements.",
        ],
      },
    ],
    enquiry: [
      "Material type and available technical results",
      "Site location and current operating or development stage",
      "Required product specification and expected volumes",
      "Access, infrastructure and handling constraints",
    ],
  },
  {
    slug: "trading-and-distribution",
    shortTitle: "Trading & distribution",
    title: "Connect supply with real demand.",
    number: "03",
    image: 44,
    group: "Deliver",
    intro:
      "A workable commodity relationship brings product quality, commercial terms and the physical supply chain into alignment.",
    overview:
      "Commodity trading connects producers and suppliers with the industries that need materials. The value of that connection depends on understanding the product, checking the counterparty and agreeing how quality, custody and delivery will be managed.",
    sections: [
      {
        title: "Define the product before the transaction",
        paragraphs: [
          "A commodity name is only the start of a specification. Physical form, composition, grade, moisture, packaging and quantities can all matter to a buyer. Requirements vary across applications, so a clear technical description reduces uncertainty at the beginning of a discussion.",
          "Representative analysis and agreed inspection arrangements help establish a common basis for negotiations. Pricing mechanisms, tolerance ranges and rejection criteria need to be understood alongside the quoted quantity. A transparent specification supports a more useful comparison between supply options.",
        ],
        points: [
          "Commodity, form and specification",
          "Available quantity, supply schedule and origin",
          "Sampling, analysis and inspection arrangements",
        ],
      },
      {
        title: "Understand the physical route",
        paragraphs: [
          "Road, rail, port and storage arrangements connect a material’s origin with its destination. Loading conditions, handling restrictions and packaging affect the practical route. Timing should reflect real access, capacity and documentation requirements.",
          "The handover of custody and commercial responsibility should be agreed in the contract. Applicable transport, trade and customs requirements depend on the product and the route. Parties should confirm the relevant rules with qualified advisers rather than relying on a general description.",
        ],
        points: [
          "Origin, destination and delivery point",
          "Handling, storage and transport requirements",
          "Documentation, custody and agreed commercial responsibilities",
        ],
      },
      {
        title: "Build a relationship on reliable information",
        paragraphs: [
          "Counterparty checks, transparent ownership information and a clear understanding of material origin support responsible trade. They also help identify inconsistencies before either party commits to a transaction. Commercial discussions should define what evidence is needed and who will provide it.",
          "A supply relationship benefits from accurate records and timely communication. Changes to quantity, quality or delivery should be visible early enough for the parties to respond. No availability, price or shipment commitment is made by the general commodity information on this website.",
        ],
      },
      {
        title: "Bring a clear sourcing or buying brief",
        paragraphs: [
          "For a supply enquiry, describe the material, origin, quantity and available analysis. For a buying enquiry, describe the required specification, destination and schedule. Both sides benefit when the commercial objectives are stated alongside the physical requirements.",
          "RockValle connects the trading conversation with the physical requirements of supply. A focused brief brings specification, volume, origin, destination and timing together.",
        ],
      },
    ],
    enquiry: [
      "Buying or supplying, with a clear commodity description",
      "Specification, quantity and proposed schedule",
      "Origin, destination and delivery requirements",
      "Available analysis and supporting documentation",
    ],
  },
  {
    slug: "recycling-and-recovery",
    shortTitle: "Recycling & recovery",
    title: "Look at materials with a longer view.",
    number: "04",
    image: 16,
    group: "Recover",
    intro:
      "Recovery considers how valuable constituents can return to productive use, alongside primary resource supply.",
    overview:
      "Secondary material recovery connects useful constituents with a productive next use. Composition, consistency, processing requirements and the intended output shape a practical recovery opportunity.",
    sections: [
      {
        title: "Understand the input stream",
        paragraphs: [
          "Secondary materials vary widely. Composition, physical form, contamination and consistency affect whether a recovery route is technically and commercially suitable. A visually similar material may have different processing requirements, so sampling and reliable analytical information are important.",
          "The source and handling history also matter. Clear material identification helps assess the appropriate pathway and the documentation that should accompany a movement. Waste and secondary-product classifications depend on the applicable jurisdiction and cannot be inferred from appearance alone.",
        ],
        points: [
          "Source, composition and available analysis",
          "Volumes, physical form and variability",
          "Classification, handling history and documentation",
        ],
      },
      {
        title: "Assess recovery and product requirements together",
        paragraphs: [
          "Recovery is useful when it produces an output that can be used or sold responsibly. Technical assessment therefore needs to consider both the material entering the process and the quality expected from the output. Residues and other by-products also need an appropriate management route.",
          "A recovery proposal should make its assumptions visible. Expected yield, sampling methods, material accountability and the responsibilities of the parties are part of the evaluation. A clear material balance helps connect technical performance with the commercial outcome.",
        ],
      },
      {
        title: "Place safe handling at the centre",
        paragraphs: [
          "Some material streams need specialist transport, storage or treatment. Hazardous constituents, batteries, dust and process residues can introduce risks that require qualified assessment and suitable facilities. A proposed commercial value does not remove those responsibilities.",
          "Before discussing collection or transfer, identify the material accurately and confirm the receiving facility’s requirements. Accurate classification and suitable documentation support responsible movement and processing.",
        ],
      },
      {
        title: "Discuss an opportunity with the right context",
        paragraphs: [
          "A useful recovery brief describes the source, the composition, the quantity and the outcome being sought. Analytical results, photographs and existing documentation can support an initial evaluation, but do not replace representative testing.",
          "Bring your recovery opportunity to RockValle with a concise partnership brief. Explain the available material, the information supporting it and the outcome you want to achieve.",
        ],
      },
    ],
    enquiry: [
      "Material source, classification and description",
      "Representative composition or analysis",
      "Available quantities and existing handling arrangements",
      "Recovery objectives and supporting documentation",
    ],
  },
];
