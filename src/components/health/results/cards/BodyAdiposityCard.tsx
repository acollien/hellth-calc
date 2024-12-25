import BaseResultCard from "./BaseResultCard";

interface BodyAdiposityCardProps {
  value: number;
}

const BodyAdiposityCard = ({ value }: BodyAdiposityCardProps) => {
  const getValueColor = (value: number) => {
    if (value < 21) return "text-green-600";
    if (value < 26) return "text-yellow-600";
    return "text-red-600";
  };

  const tooltipContent = {
    title: "Body Adiposity Index (BAI)",
    description: "A measure of body fat percentage that uses hip circumference and height.",
    formula: "BAI = (hip circumference / height^1.5) - 18",
    interpretation: (
      <ul className="list-disc pl-4">
        <li>&lt;21: Low body fat</li>
        <li>21-26: Healthy range</li>
        <li>&gt;26: Elevated body fat</li>
      </ul>
    ),
    citation: {
      text: "View BAI Development Study (2011)",
      url: "https://pubmed.ncbi.nlm.nih.gov/21475137/"
    }
  };

  return (
    <BaseResultCard
      label="Body Adiposity Index"
      value={value}
      valueColor={getValueColor(value)}
      tooltipContent={tooltipContent}
      precision={1}
    />
  );
};

export default BodyAdiposityCard;