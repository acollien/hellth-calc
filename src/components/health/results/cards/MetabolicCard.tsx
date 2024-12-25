import BaseResultCard from "./BaseResultCard";

interface MetabolicCardProps {
  value: number;
  type: 'bmr' | 'tdee';
}

const MetabolicCard = ({ value, type }: MetabolicCardProps) => {
  const getValueColor = (value: number, type: 'bmr' | 'tdee') => {
    if (type === 'bmr') {
      if (value < 1200) return "text-blue-600";
      if (value < 1800) return "text-green-600";
      if (value < 2200) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (value < 1500) return "text-blue-600";
      if (value < 2500) return "text-green-600";
      if (value < 3000) return "text-yellow-600";
      return "text-red-600";
    }
  };

  const tooltipContent = {
    title: type === 'bmr' ? "Basal Metabolic Rate (BMR)" : "Total Daily Energy Expenditure (TDEE)",
    description: type === 'bmr' 
      ? "The number of calories your body burns at rest to maintain basic life functions."
      : "The total number of calories you burn in a day, including activity.",
    formula: type === 'bmr'
      ? "Mifflin-St Jeor Equation:\nMen: (10 × weight kg) + (6.25 × height cm) - (5 × age) + 5\nWomen: (10 × weight kg) + (6.25 × height cm) - (5 × age) - 161"
      : "TDEE = BMR × Activity Factor",
    interpretation: type === 'bmr' ? (
      <ul className="list-disc pl-4">
        <li>Low: &lt;1200 calories</li>
        <li>Normal: 1200-1800 calories</li>
        <li>High: 1800-2200 calories</li>
        <li>Very High: &gt;2200 calories</li>
      </ul>
    ) : (
      <ul className="list-disc pl-4">
        <li>Low: &lt;1500 calories</li>
        <li>Normal: 1500-2500 calories</li>
        <li>High: 2500-3000 calories</li>
        <li>Very High: &gt;3000 calories</li>
      </ul>
    ),
    citation: {
      text: type === 'bmr' 
        ? "View Mifflin-St Jeor BMR Study (1990)"
        : "View Activity Multipliers Validation Study (1988)",
      url: type === 'bmr'
        ? "https://pubmed.ncbi.nlm.nih.gov/2305711/"
        : "https://pubmed.ncbi.nlm.nih.gov/3522187/"
    }
  };

  return (
    <BaseResultCard
      label={type === 'bmr' ? "BMR (calories/day)" : "TDEE (calories/day)"}
      value={value}
      valueColor={getValueColor(value, type)}
      tooltipContent={tooltipContent}
      precision={0}
    />
  );
};

export default MetabolicCard;