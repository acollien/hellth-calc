import { getValueColor } from "@/utils/health/display";
import BaseResultCard from "./BaseResultCard";

interface BodyFatDistributionCardProps {
  value: number;
}

const BodyFatDistributionCard = ({ value }: BodyFatDistributionCardProps) => {
  const valueColor = getValueColor(value, [
    { min: 0.5, color: "text-green-600" },
    { min: 0.8, color: "text-yellow-600" },
    { min: Infinity, color: "text-red-600" }
  ]);

  const interpretation = (
    <ul className="list-disc pl-4">
      <li>Below 0.5: Optimal fat distribution, lower health risk</li>
      <li>0.5-0.8: Moderate fat distribution, increased health risk</li>
      <li>Above 0.8: High central fat distribution, significant health risk</li>
    </ul>
  );

  return (
    <BaseResultCard
      label="Body Fat Distribution Index"
      value={value}
      valueColor={valueColor}
      tooltipContent={{
        title: "Body Fat Distribution Index (BFDI)",
        description: "A measure that evaluates how body fat is distributed between the waist and hip regions, taking height into account. This index helps assess central obesity and related health risks.",
        formula: "BFDI = (Waist² × Height) / (Hip² × √Height)",
        interpretation
      }}
    />
  );
};

export default BodyFatDistributionCard;