import BaseResultCard from "./BaseResultCard";

interface WaistHeightCardProps {
  value: number;
}

const WaistHeightCard = ({ value }: WaistHeightCardProps) => {
  const getTextColor = (ratio: number) => {
    if (ratio < 0.4) return "text-blue-600";
    if (ratio < 0.5) return "text-green-600";
    if (ratio < 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  const tooltipContent = {
    title: "Waist-to-Height Ratio (WHtR)",
    description: "A simple and effective screening tool for cardiovascular health risk and central obesity.",
    formula: "WHtR = Waist Circumference / Height",
    interpretation: (
      <ul className="list-disc pl-4">
        <li>Below 0.4: Very Low - may indicate insufficient body mass</li>
        <li>0.4-0.5: Healthy - optimal range for health outcomes</li>
        <li>0.5-0.6: Overweight - increased health risks</li>
        <li>Above 0.6: Obese - significantly elevated health risks</li>
      </ul>
    ),
    citation: {
      text: "View WHtR Meta-Analysis Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/20819243/"
    }
  };

  return (
    <BaseResultCard
      label="Waist-to-Height Ratio"
      value={value}
      valueColor={getTextColor(value)}
      tooltipContent={tooltipContent}
      precision={3}
    />
  );
};

export default WaistHeightCard;