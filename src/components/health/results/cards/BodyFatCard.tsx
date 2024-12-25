import { getValueColor } from "@/utils/health/display";
import BaseResultCard from "./BaseResultCard";

interface BodyFatCardProps {
  methodKey: string;
  value: number;
  gender: 'male' | 'female';
  tooltipContent: {
    title: string;
    description: string;
    formula: string;
    citation?: string;
  };
}

const BodyFatCard = ({ methodKey, value, gender, tooltipContent }: BodyFatCardProps) => {
  console.log(`Rendering BodyFatCard for ${methodKey} with value:`, value);

  const getBodyFatColor = (value: number, gender: string) => {
    if (gender === 'male') {
      if (value < 6) return "text-blue-600";
      if (value < 14) return "text-green-600";
      if (value < 25) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (value < 14) return "text-blue-600";
      if (value < 21) return "text-green-600";
      if (value < 32) return "text-yellow-600";
      return "text-red-600";
    }
  };

  const valueColor = getBodyFatColor(value, gender);

  const getMethodLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      navy: "U.S. Navy Method",
      jackson: "Jackson-Pollock",
      bmiBased: "Deurenberg BMI",
      army: "U.S. Army Method"
    };
    return labels[key] || key;
  };

  const getInterpretation = (value: number, gender: string) => {
    if (gender === 'male') {
      return (
        <ul className="list-disc pl-4">
          <li>Essential Fat: 2-5%</li>
          <li>Athletes: 6-13%</li>
          <li>Fitness: 14-17%</li>
          <li>Acceptable: 18-24%</li>
          <li>Excess: 25%+</li>
        </ul>
      );
    } else {
      return (
        <ul className="list-disc pl-4">
          <li>Essential Fat: 10-13%</li>
          <li>Athletes: 14-20%</li>
          <li>Fitness: 21-24%</li>
          <li>Acceptable: 25-31%</li>
          <li>Excess: 32%+</li>
        </ul>
      );
    }
  };

  const enhancedTooltipContent = {
    ...tooltipContent,
    interpretation: getInterpretation(value, gender),
    citation: tooltipContent.citation ? {
      text: "View Research Paper",
      url: tooltipContent.citation
    } : undefined
  };

  return (
    <BaseResultCard
      label={getMethodLabel(methodKey)}
      value={value}
      valueColor={valueColor}
      tooltipContent={enhancedTooltipContent}
      precision={1}
      unit="%"
    />
  );
};

export default BodyFatCard;