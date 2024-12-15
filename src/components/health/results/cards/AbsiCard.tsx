import BaseResultCard from "./BaseResultCard";

interface AbsiCardProps {
  value: { metric: number; imperial: number };
  unit: 'metric' | 'imperial';
}

const AbsiCard = ({ value, unit }: AbsiCardProps) => {
  const getValueColor = (value: number) => {
    if (value < 0.07) return "text-green-600";
    if (value < 0.08) return "text-yellow-600";
    return "text-red-600";
  };

  const interpretation = (
    <ul className="list-disc pl-4">
      <li>Below 0.07: Low health risk</li>
      <li>0.07-0.08: Average health risk</li>
      <li>Above 0.08: Elevated health risk</li>
    </ul>
  );

  return (
    <BaseResultCard
      label="A Body Shape Index"
      value={value[unit]}
      valueColor={getValueColor(value[unit])}
      tooltipContent={{
        title: "A Body Shape Index (ABSI)",
        description: "A measure that evaluates body shape independent of height and weight, focusing on the health implications of central obesity.",
        formula: "ABSI = WC / (BMI^(2/3) × Height^(1/2))",
        interpretation
      }}
    />
  );
};

export default AbsiCard;