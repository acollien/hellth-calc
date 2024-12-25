import BaseResultCard from "./BaseResultCard";

interface LeanBodyMassCardProps {
  value: number;
  unit: 'metric' | 'imperial';
}

const LeanBodyMassCard = ({ value, unit }: LeanBodyMassCardProps) => {
  const getValueColor = (value: number) => {
    if (value < 35) return "text-blue-600";
    if (value < 45) return "text-green-600";
    if (value < 55) return "text-yellow-600";
    return "text-red-600";
  };

  const tooltipContent = {
    title: "Lean Body Mass (LBM)",
    description: "The total mass of your body excluding fat. Includes muscle, bone, organs, and water.",
    formula: "Boer Formula (1984):\nMen: LBM = (0.407 × weight) + (0.267 × height) - 19.2\nWomen: LBM = (0.252 × weight) + (0.473 × height) - 48.3",
    interpretation: (
      <ul className="list-disc pl-4">
        <li>Low: &lt;35 kg</li>
        <li>Normal: 35-45 kg</li>
        <li>High: 45-55 kg</li>
        <li>Very High: &gt;55 kg</li>
      </ul>
    ),
    citation: "https://pubmed.ncbi.nlm.nih.gov/6520232/"
  };

  return (
    <BaseResultCard
      label="Lean Body Mass"
      value={value}
      valueColor={getValueColor(value)}
      tooltipContent={tooltipContent}
      precision={1}
      unit={unit === 'metric' ? 'kg' : 'lbs'}
    />
  );
};

export default LeanBodyMassCard;