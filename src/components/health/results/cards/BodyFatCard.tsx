import BaseResultCard from "./BaseResultCard";

interface BodyFatCardProps {
  methodKey: string;
  value: number;
  gender: 'male' | 'female';
  tooltipContent: {
    title: string;
    description: string;
    formula: string;
  };
}

const BodyFatCard = ({ methodKey, value, gender, tooltipContent }: BodyFatCardProps) => {
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

  const getMethodLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      navy: "U.S. Navy Method",
      jackson: "Jackson-Pollock",
      bmiBased: "Deurenberg BMI",
      army: "U.S. Army Method"
    };
    return labels[key] || key;
  };

  const interpretation = (
    <ul className="list-disc pl-4">
      {gender === 'male' ? (
        <>
          <li>Essential Fat: 2-5%</li>
          <li>Athletes: 6-13%</li>
          <li>Fitness: 14-17%</li>
          <li>Acceptable: 18-24%</li>
          <li>Excess: 25%+</li>
        </>
      ) : (
        <>
          <li>Essential Fat: 10-13%</li>
          <li>Athletes: 14-20%</li>
          <li>Fitness: 21-24%</li>
          <li>Acceptable: 25-31%</li>
          <li>Excess: 32%+</li>
        </>
      )}
    </ul>
  );

  const citations = {
    navy: {
      text: "View U.S. Navy Method Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/3140611/"
    },
    jackson: {
      text: "View Jackson-Pollock Method Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/497191/"
    },
    bmiBased: {
      text: "View Deurenberg Method Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/1895955/"
    },
    army: {
      text: "View U.S. Army Method Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/15142296/"
    }
  };

  const enhancedTooltipContent = {
    ...tooltipContent,
    interpretation,
    citation: citations[methodKey as keyof typeof citations] || {
      text: "View Method Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/"
    }
  };

  return (
    <BaseResultCard
      label={getMethodLabel(methodKey)}
      value={value}
      valueColor={getBodyFatColor(value, gender)}
      tooltipContent={enhancedTooltipContent}
      precision={1}
      unit="%"
    />
  );
};

export default BodyFatCard;