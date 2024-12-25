import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RangeBar from "@/components/health/visualizations/RangeBar";
import BMIDescription from "./BMIDescription";

interface BMICardProps {
  type: string;
  value: number;
  info: {
    title: string;
    formula: string;
    description: string;
    interpretation: string;
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
  console.log(`Rendering BMI card for ${type} with value:`, value);
  
  const getValueColor = (value: number) => {
    if (value < 18.5) return "text-blue-600";
    if (value < 25) return "text-green-600";
    if (value < 30) return "text-yellow-600";
    return "text-red-600";
  };

  const citations = {
    standard: {
      text: "View WHO BMI Classification Study",
      url: "https://www.who.int/europe/news-room/fact-sheets/item/body-mass-index---bmi"
    },
    athletic: {
      text: "View Athletic BMI Research",
      url: "https://pubmed.ncbi.nlm.nih.gov/7315096/"
    },
    devine: {
      text: "View Devine Formula Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/4881690/"
    },
    bmiBased: {
      text: "View Oxford Modified BMI Formula",
      url: "https://people.maths.ox.ac.uk/trefethen/bmi.html"
    }
  };

  const tooltipContent = {
    title: info.title,
    description: info.description,
    formula: info.formula,
    interpretation: (
      <ul className="list-disc pl-4">
        <li>&lt;18.5: Underweight - May indicate insufficient body mass</li>
        <li>18.5-24.9: Normal weight - Optimal range for health</li>
        <li>25-29.9: Overweight - Increased health risks</li>
        <li>&gt;30: Obese - Significantly elevated health risks</li>
      </ul>
    ),
    citation: citations[type as keyof typeof citations]
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex-1">
              <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                {info.title}
                <Info className="h-4 w-4 text-mint-500" />
              </div>
              <div className={`text-2xl font-semibold ${getValueColor(value)}`}>
                {value.toFixed(1)}
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-2">
            <h4 className="font-semibold">{tooltipContent.title}</h4>
            <p>{tooltipContent.description}</p>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">{tooltipContent.formula}</p>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                {tooltipContent.interpretation}
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <p className="font-medium">Citation:</p>
                <a 
                  href={tooltipContent.citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {tooltipContent.citation.text}
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <RangeBar
        value={value}
        ranges={ranges}
        max={40}
      />
    </div>
  );
};

export default BMICard;