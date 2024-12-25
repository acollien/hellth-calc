import BaseResultCard from "./BaseResultCard";

interface FatFreeMassCardProps {
  value: number;
}

const FatFreeMassCard = ({ value }: FatFreeMassCardProps) => {
  const getValueColor = (value: number) => {
    if (value < 16) return "text-blue-600";
    if (value < 20) return "text-green-600";
    if (value < 25) return "text-yellow-600";
    return "text-red-600";
  };

  const tooltipContent = {
    title: "Fat-Free Mass Index (FFMI)",
    description: "A measure of lean mass relative to height, similar to BMI but excluding body fat.",
    formula: "FFMI = LBM / height² (where LBM = weight × (1 - body fat %))",
    interpretation: (
      <ul className="list-disc pl-4">
        <li>&lt;16: Below average lean mass</li>
        <li>16-20: Average lean mass</li>
        <li>20-25: Above average lean mass</li>
        <li>&gt;25: Exceptional lean mass</li>
      </ul>
    ),
    citation: "https://pubmed.ncbi.nlm.nih.gov/1730811/"
  };

  return (
    <BaseResultCard
      label="Fat-Free Mass Index"
      value={value}
      valueColor={getValueColor(value)}
      tooltipContent={tooltipContent}
      precision={1}
      unit="kg/m²"
    />
  );
};

export default FatFreeMassCard;