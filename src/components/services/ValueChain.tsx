import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "../../data/services";
const steps = [
  {
    title: "Explore & assess",
    text: "Establish the geological and commercial questions before choosing a development route. The quality of the evidence affects every later decision.",
    points: [
      "Existing records, location and resource setting",
      "Representative sampling and technical interpretation",
      "Permissions, access and development objectives",
    ],
  },
  {
    title: "Extract & process",
    text: "Evaluate extraction, preparation and product requirements as one system. The suitable route depends on the material and the conditions around it.",
    points: [
      "Deposit characteristics and mine-stage constraints",
      "Processing assessment and product quality",
      "Material movement, safety and environmental controls",
    ],
  },
  {
    title: "Source & deliver",
    text: "Connect a clearly described product with a clearly understood requirement. Commercial arrangements and physical logistics need to support the same objective.",
    points: [
      "Specification, quantity and supply timetable",
      "Origin, custody and counterparty information",
      "Handling, delivery and acceptance arrangements",
    ],
  },
  {
    title: "Recover & reuse",
    text: "Evaluate secondary material streams alongside appropriate recovery routes. The potential value depends on composition, processing suitability and the use of the recovered output.",
    points: [
      "Material identity, classification and analysis",
      "Permitted handling and suitable facilities",
      "Recovery objectives, output and residue pathways",
    ],
  },
];
export default function ValueChain() {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  return (
    <div className="value-chain-interactive">
      <div className="chain-buttons" aria-label="Resource value chain stages">
        {steps.map((s, i) => (
          <button
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
            key={s.title}
          >
            <span>0{i + 1}</span>
            {s.title}
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="chain-panel" aria-live="polite">
        <span className="eyebrow">Stage 0{index + 1}</span>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
        <ul>
          {step.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <Link className="text-link" to={`/services/${services[index].slug}`}>
          Explore this stage ↗
        </Link>
      </div>
    </div>
  );
}
