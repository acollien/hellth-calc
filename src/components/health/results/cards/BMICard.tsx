import BaseResultCard from "./BaseResultCard";

interface BMICardProps {
  type: string;
  value: number;
  info: {
    title: string;
    formula: string;
    description: string;
  };
  ranges: Array<{
    min: number;
    max: number;
    label: string;
    color: string;
    description: string;
  }>;
}

const BMICard = ({ type, value, info, ranges }: BMICardProps) => {
  const getValueColor = (value: number) => {
    if (value < 18.5) return "text-blue-600";
    if (value < 25) return "text-green-600";
    if (value < 30) return "text-yellow-600";
    return "text-red-600";
  };

  const interpretation = (
    <ul className="list-disc pl-4">
      <li>&lt;18.5: Underweight</li>
      <li>18.5-24.9: Normal weight</li>
      <li>25-29.9: Overweight</li>
      <li>&gt;30: Obese</li>
    </ul>
  );

  const tooltipContent = {
    title: info.title,
    description: info.description,
    formula: info.formula,
    interpretation,
    citation: {
      text: "View WHO BMI Classification Study",
      url: "https://www.who.int/europe/news-room/fact-sheets/item/body-mass-index---bmi"
    }
  };

  return (
    <BaseResultCard
      label={info.title}
      value={value}
      valueColor={getValueColor(value)}
      tooltipContent={tooltipContent}
      precision={1}
      unit="kg/m²"
    />
  );
};

export default BMICard;