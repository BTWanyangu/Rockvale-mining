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
    title: "The right material. A coordinated journey.",
    number: "03",
    image: 44,
    group: "Deliver",
    intro:
      "RockValle connects commodity enquiries with freight, storage and distribution planning, bringing the product and its journey into one conversation.",
    overview:
      "Explore gold, diamonds and copper cathodes alongside air, road and ocean freight, cargo handling, warehousing and delivery coordination. Start with the material, the route and the result your business needs.",
    sections: [
      {
        title: "Gold trading",
        paragraphs: [
          "Gold enquiries begin with a precise description of the material: bars, nuggets or dust, together with weight, origin and available assay results. Product form and verified composition provide the basis for comparing an offer with a buyer’s requirements.",
          "Bring the proposed quantity, inspection location and delivery point into the discussion early. Sampling, acceptance, custody and settlement arrangements should describe the same consignment from first inspection through final handover.",
        ],
        points: [
          "Product form, weight and available assay",
          "Origin and supporting ownership records",
          "Inspection, secure handling and delivery arrangements",
        ],
      },
      {
        title: "Diamond trading",
        paragraphs: [
          "A diamond brief distinguishes rough from polished stones and records the characteristics relevant to the buyer. Carat weight, measurements, grading information and individual or parcel identification help make the discussion specific.",
          "Use available laboratory reports, origin documents and clear photographs to support an enquiry. Agree how the material will be examined, how a parcel will remain identifiable and where responsibility passes during delivery.",
        ],
        points: [
          "Rough or polished material and parcel size",
          "Identification, grading reports and provenance",
          "Viewing, acceptance and documented custody",
        ],
      },
      {
        title: "Copper cathodes trading",
        paragraphs: [
          "Copper cathode enquiries connect the required metal specification with a practical supply schedule. State the grade, purity, quantity and delivery location, together with any producer or brand requirements for the intended application.",
          "For a supply proposal, include recent analysis, origin details, bundle information and the loading point. Align inspection and weighing arrangements with the specification so the buyer and supplier work from a shared acceptance record.",
        ],
        points: [
          "Required composition and analytical evidence",
          "Available tonnage, bundle weights and supply schedule",
          "Origin, loading location and receiving requirements",
        ],
      },
      {
        title: "Air freight",
        paragraphs: [
          "Air freight planning starts with the shipment’s ready date and the receiving deadline. The packaged dimensions, gross weight, number of pieces and handling needs help define the collection and airport movements.",
          "Bring the complete journey into the brief: collection address, departure and arrival airports, clearance responsibilities and final delivery point. A clear handover plan keeps the air movement connected with the transport at either end.",
        ],
        points: [
          "Ready date, required arrival and destination",
          "Packaged dimensions, weight and handling requirements",
          "Airport-to-airport or door delivery scope",
        ],
      },
      {
        title: "Road freight",
        paragraphs: [
          "Road freight links collection points, storage facilities, ports and receiving sites. The cargo volume and delivery pattern help determine whether a consolidated movement or a dedicated load fits the requirement.",
          "Confirm access at both ends before defining the schedule. Loading equipment, site opening hours, unloading arrangements and any border handovers belong in the transport brief alongside the delivery address.",
        ],
        points: [
          "Collection and delivery addresses with site contacts",
          "Consolidated cargo or dedicated load requirements",
          "Loading access, receiving hours and unloading arrangements",
        ],
      },
      {
        title: "Ocean freight",
        paragraphs: [
          "Ocean freight planning connects the product’s packaging and volume with the intended port route. Full-container and shared-container options address different shipment sizes; the brief should also describe any temperature, moisture or handling requirements.",
          "Coordinate the port movement with inland collection and delivery. Container loading, departure cut-offs, destination handling and cargo release all contribute to the overall timetable and the scope of the quotation.",
        ],
        points: [
          "Origin and destination ports with inland delivery points",
          "Container size or shared-container cargo volume",
          "Packing, loading and destination handling scope",
        ],
      },
      {
        title: "Bulky cargo & consolidation",
        paragraphs: [
          "Bulky goods need a transport brief based on their actual packed dimensions. Size, weight, stacking restrictions and lifting access influence the space required and the handling sequence.",
          "For consolidated consignments, identify every item and its destination before goods are grouped. Packaging, labelling and a clear packing list help connect collection, storage and delivery records as individual shipments move through the route.",
        ],
        points: [
          "Item dimensions, weight and stacking restrictions",
          "Packaging, labels and itemised packing list",
          "Consolidation location and delivery sequence",
        ],
      },
      {
        title: "Urgent cargo",
        paragraphs: [
          "An urgent shipment needs a defined delivery priority, a cargo-ready time and a receiving contact who can accept the goods. These details help focus the conversation on the critical part of the journey.",
          "Separate the required deadline from the proposed transport timetable. Collection, carrier departure, clearance and final delivery should have named responsibilities, with updates centred on the milestones that affect the receiving business.",
        ],
        points: [
          "Cargo-ready time and required delivery deadline",
          "Shipment dimensions, documents and receiving contact",
          "Priority milestones and communication arrangements",
        ],
      },
      {
        title: "Project cargo",
        paragraphs: [
          "Project shipments bring equipment, materials and site schedules into one plan. Oversized or heavy items require accurate dimensions, weights, drawings and handling information before the route and delivery sequence are developed.",
          "Connect the movement with the project’s installation timetable. Site access, receiving equipment, storage space and the order in which items are needed should be reflected in the logistics brief and each handover.",
        ],
        points: [
          "Equipment list, drawings and packaged weights",
          "Handling requirements and site access information",
          "Delivery sequence and installation milestones",
        ],
      },
      {
        title: "Warehousing & safekeeping",
        paragraphs: [
          "Storage planning begins with the material, the expected holding period and the conditions it needs. Item identification, space requirements, access arrangements and the expected release schedule define a useful warehousing brief.",
          "Safekeeping depends on a clear custody record. Record what is received, its condition, its location and who can authorise release. For valuable consignments, include the inspection and secure-transfer arrangements in the same discussion.",
        ],
        points: [
          "Material description, storage conditions and duration",
          "Receipt records, stock identification and authorised access",
          "Release instructions, handling and onward delivery",
        ],
      },
      {
        title: "Customs clearance & port handling",
        paragraphs: [
          "Clearance planning brings the product description, commercial invoice, packing list and origin information together before the shipment reaches a border or port. The documents should identify the same goods, quantities and parties throughout the movement.",
          "Agree who coordinates the declaration, cargo release and onward transport for the chosen route. Port handling, unloading and collection should form part of the delivery plan so the consignment moves from arrival to its receiving point with clear responsibilities.",
        ],
        points: [
          "Invoice, packing list and product description",
          "Origin records and route-specific supporting documents",
          "Clearance responsibilities, release and port collection",
        ],
      },
      {
        title: "Third-party logistics & distribution",
        paragraphs: [
          "Distribution planning connects stock receipt, storage, order preparation and delivery. A single consignment and a recurring supply programme can use the same clear approach to item records, receiving requirements and handovers.",
          "For ongoing third-party logistics, describe the order pattern, delivery locations and reporting needs. Agree how stock movements, dispatch records, exceptions and proof of delivery will be reconciled with the customer’s own records.",
        ],
        points: [
          "Stock profile, order frequency and delivery locations",
          "Picking, packing, labelling and dispatch requirements",
          "Stock reporting, delivery records and reconciliation",
        ],
      },
      {
        title: "Supply-chain planning & shipment updates",
        paragraphs: [
          "A useful supply-chain discussion compares the product’s needs with the available route, shipment frequency and receiving schedule. Combining transport modes, consolidation and storage can help structure a movement around the business’s priorities.",
          "Make shipment visibility practical by agreeing the reference numbers, milestones and update contacts at the start. Collection, departure, arrival, clearance and final handover provide a shared sequence for progress reports and early discussion of changes.",
        ],
        points: [
          "Business priorities, route options and shipment frequency",
          "Consignment references and agreed progress milestones",
          "Update contacts and a process for reporting changes",
        ],
      },
      {
        title: "Commercial terms & customer support",
        paragraphs: [
          "A clear quotation connects the goods with the requested service scope. Product pricing, transport, storage and handling should be identifiable, with a stated timetable, delivery point and agreed payment terms.",
          "Keep communication linked to one enquiry or consignment reference. Named contacts, accurate invoices and written records of agreed changes help the customer, supplier and logistics participants work from the same instructions.",
        ],
        points: [
          "Defined quotation scope and commercial responsibilities",
          "Agreed payment, acceptance and delivery terms",
          "Named contacts, invoice details and change records",
        ],
      },
      {
        title: "Trading & logistics FAQs",
        paragraphs: [
          "How do I request a quote? Open a trading enquiry with the product or cargo description, quantity, origin, destination and requested schedule. Add available analysis for commodities, or packaged weights and dimensions for freight.",
          "Can I discuss a single shipment or a recurring programme? Include the expected frequency and the result you need. A one-off delivery, ongoing supply relationship and wider distribution requirement each benefit from a clearly defined brief.",
          "What should I prepare before collection? Bring together the material or cargo identification, available inspection records, packing information, pickup contact and receiving instructions. Use one reference to keep the quotation and subsequent shipment discussion connected.",
        ],
      },
    ],
    enquiry: [
      "Buying, supplying, freight, storage or distribution requirement",
      "Commodity specification or cargo description, quantity and packaged dimensions",
      "Origin, destination, delivery point and preferred schedule",
      "Available analysis, origin records, invoice and packing information",
      "Handling, storage, inspection and receiving requirements",
      "Contact details and the requested quotation scope",
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