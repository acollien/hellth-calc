import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface BodyFatResultsProps {
  bodyFat: {
    navy: number | null;
    jackson: number | null;
    bmiBased: number | null;
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
    navy: "U.S. Navy Method: Uses circumference measurements.\nMen: 86.010×log10(abdomen-neck) - 70.041×log10(height) + 36.76\nWomen: 163.205×log10(waist+hip-neck) - 97.684×log10(height) - 78.387",
    jackson: "Jackson-Pollock Method: Uses multiple skinfold measurements.\nConsidered one of the most accurate non-invasive methods.\nUses 3-7 site measurements for calculation.",
    bmiBased: "BMI-Based Estimation: Rough estimation using BMI correlation.\nLess accurate but requires minimal measurements."
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Body Fat Percentage</h3>
      <div className="grid gap-4 sm:grid-cols-3">
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
                <TooltipContent className="max-w-xs whitespace-pre-line">
                  <p className="text-sm">{tooltipContent[key as keyof typeof tooltipContent]}</p>
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