import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface BodyFatResultsProps {
  bodyFat: {
    navy: number | null;
    jackson: number | null;
    bmiBased: number | null;
    army: number | null;
  };
  gender: 'male' | 'female';
}

const getBodyFatColor = (bodyFat: number, gender: 'male' | 'female') => {
  const ranges = gender === 'male' 
    ? { low: 6, healthy: 24, high: 32 }
    : { low: 14, healthy: 31, high: 39 };

  if (bodyFat < ranges.low) return "text-blue-600";
  if (bodyFat < ranges.healthy) return "text-green-600";
  if (bodyFat < ranges.high) return "text-yellow-600";
  return "text-red-600";
};

const BodyFatResults = ({ bodyFat, gender }: BodyFatResultsProps) => {
  const tooltipContent = {
    navy: {
      title: "U.S. Navy Method",
      description: "Uses circumference measurements.",
      formula: "Men: 86.010×log10(abdomen-neck) - 70.041×log10(height) + 36.76\nWomen: 163.205×log10(waist+hip-neck) - 97.684×log10(height) - 78.387",
      ranges: {
        male: [
          "Essential Fat: 2-5%",
          "Athletes: 6-13%",
          "Fitness: 14-17%",
          "Average: 18-24%",
          "Obese: 25%+"
        ],
        female: [
          "Essential Fat: 10-13%",
          "Athletes: 14-20%",
          "Fitness: 21-24%",
          "Average: 25-31%",
          "Obese: 32%+"
        ]
      }
    },
    jackson: {
      title: "Jackson-Pollock Method",
      description: "Uses multiple skinfold measurements.",
      formula: "Based on 3-7 site measurements",
      ranges: {
        male: [
          "Essential Fat: 2-5%",
          "Athletes: 6-13%",
          "Fitness: 14-17%",
          "Average: 18-24%",
          "Obese: 25%+"
        ],
        female: [
          "Essential Fat: 10-13%",
          "Athletes: 14-20%",
          "Fitness: 21-24%",
          "Average: 25-31%",
          "Obese: 32%+"
        ]
      }
    },
    bmiBased: {
      title: "BMI-Based Estimation",
      description: "Rough estimation using BMI correlation.",
      formula: "Based on BMI and demographic factors",
      ranges: {
        male: [
          "Very Low: <8%",
          "Low: 8-15%",
          "Normal: 15-20%",
          "Moderate: 20-25%",
          "High: >25%"
        ],
        female: [
          "Very Low: <15%",
          "Low: 15-22%",
          "Normal: 22-27%",
          "Moderate: 27-32%",
          "High: >32%"
        ]
      }
    },
    army: {
      title: "U.S. Army Method",
      description: "Official method used by the U.S. Army.",
      formula: "Similar to Navy method but with different coefficients",
      ranges: {
        male: [
          "17-20 years: 17-20%",
          "21-27 years: 19-22%",
          "28-39 years: 21-24%",
          "40+ years: 23-26%"
        ],
        female: [
          "17-20 years: 24-27%",
          "21-27 years: 26-29%",
          "28-39 years: 28-31%",
          "40+ years: 30-33%"
        ]
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Body Fat Percentage</h3>
      <div className="grid gap-4 sm:grid-cols-4">
        {Object.entries(bodyFat).map(([key, value]) => (
          value !== null && (
            <div key={key} className="p-4 rounded-lg bg-mint-50 border border-mint-100">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="inline-flex items-center w-full">
                    <div className="w-full">
                      <div className="text-sm text-mint-800 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className={`text-2xl font-semibold ${getBodyFatColor(value, gender)}`}>
                        {value.toFixed(1)}%
                      </div>
                    </div>
                    <Info className="h-4 w-4 ml-1 text-mint-500" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{tooltipContent[key as keyof typeof tooltipContent].title}</h4>
                    <p>{tooltipContent[key as keyof typeof tooltipContent].description}</p>
                    <div className="text-sm space-y-1">
                      <p className="font-medium">Formula:</p>
                      <p className="text-mint-700 whitespace-pre-line">{tooltipContent[key as keyof typeof tooltipContent].formula}</p>
                      <p className="font-medium mt-2">Ranges ({gender === 'male' ? 'Men' : 'Women'}):</p>
                      <ul className="list-disc pl-4">
                        {tooltipContent[key as keyof typeof tooltipContent].ranges[gender].map((range, index) => (
                          <li key={index}>{range}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default BodyFatResults;