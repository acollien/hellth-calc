import BaseResultCard from "./BaseResultCard";

interface WaistToHipCardProps {
  value: number;
}

const WaistToHipCard = ({ value }: WaistToHipCardProps) => {
  const getWHRColor = (ratio: number) => {
    if (ratio < 0.85) return "text-green-600";
    if (ratio < 0.90) return "text-yellow-600";
    return "text-red-600";
  };

  const tooltipContent = {
    title: "Waist-to-Hip Ratio (WHR)",
    description: "A measure of body fat distribution and health risk, particularly useful for assessing cardiovascular risk.",
    formula: "WHR = Waist Circumference / Hip Circumference",
    interpretation: (
      <ul className="list-disc pl-4">
        <li>Men: Below 0.90 (Optimal: &lt;0.85)</li>
        <li>Women: Below 0.85 (Optimal: &lt;0.80)</li>
        <li>Higher ratios indicate increased health risks</li>
      </ul>
    ),
    citation: {
      text: "View WHO WHR Guidelines Study",
      url: "https://apps.who.int/iris/handle/10665/44583"
    }
  };

  return (
    <BaseResultCard
      label="Waist-to-Hip Ratio"
      value={value}
      valueColor={getWHRColor(value)}
      tooltipContent={tooltipContent}
      precision={2}
    />
  );
};

export default WaistToHipCard;