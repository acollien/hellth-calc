import BaseResultCard from "./BaseResultCard";

interface ConicityCardProps {
  value: number;
}

const ConicityCard = ({ value }: ConicityCardProps) => {
  const getValueColor = (value: number) => {
    if (value < 1.25) return "text-green-600";
    if (value < 1.35) return "text-yellow-600";
    return "text-red-600";
  };

  const tooltipContent = {
    title: "Conicity Index (C-Index)",
    description: "A measure that evaluates abdominal fat distribution by comparing your waist circumference to a theoretical cylindrical shape.",
    formula: "C-Index = Waist / (0.109 × √(Weight/Height))",
    interpretation: (
      <ul className="list-disc pl-4">
        <li>&lt;1.25: Low cardiovascular risk</li>
        <li>1.25-1.35: Moderate cardiovascular risk</li>
        <li>&gt;1.35: High cardiovascular risk</li>
      </ul>
    ),
    citation: "https://pubmed.ncbi.nlm.nih.gov/1895955/"
  };

  return (
    <BaseResultCard
      label="Conicity Index"
      value={value}
      valueColor={getValueColor(value)}
      tooltipContent={tooltipContent}
      precision={2}
    />
  );
};

export default ConicityCard;