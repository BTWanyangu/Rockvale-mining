export default function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="section-heading">
      {kicker && <span className="eyebrow">{kicker}</span>}
      <h2>{title}</h2>
      {desc && <p className="lead">{desc}</p>}
    </div>
  );
}
