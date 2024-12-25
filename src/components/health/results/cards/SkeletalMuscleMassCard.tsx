import BaseResultCard from "./BaseResultCard";

interface SkeletalMuscleMassCardProps {
  value: number;
  unit: 'metric' | 'imperial';
}

const SkeletalMuscleMassCard = ({ value, unit }: SkeletalMuscleMassCardProps) => {
  const getValueColor = (value: number) => {
    if (value < 25) return "text-blue-600";
    if (value < 35) return "text-green-600";
    if (value < 45) return "text-yellow-600";
    return "text-red-600";
  };

  const tooltipContent = {
    title: "Skeletal Muscle Mass (SMM)",
    description: "The total mass of all skeletal muscles in your body. This is a key indicator of physical strength and metabolic health.",
    formula: "Lee et al. (2000) equation:\nSMM = (0.244 × weight) + (0.117 × height) - (0.127 × age) + (10.8 × sex) + 2.98\nwhere sex = 1 for men, 0 for women",
    interpretation: (
      <ul className="list-disc pl-4">
        <li>Low: &lt;25 kg</li>
        <li>Normal: 25-35 kg</li>
        <li>High: 35-45 kg</li>
        <li>Very High: &gt;45 kg</li>
      </ul>
    ),
    citation: {
      text: "View Lee et al. SMM Study (2000)",
      url: "https://pubmed.ncbi.nlm.nih.gov/11074538/"
    }
  };

  return (
    <BaseResultCard
      label="Skeletal Muscle Mass"
      value={value}
      valueColor={getValueColor(value)}
      tooltipContent={tooltipContent}
      precision={1}
      unit={unit === 'metric' ? 'kg' : 'lbs'}
    />
  );
};

export default SkeletalMuscleMassCard;