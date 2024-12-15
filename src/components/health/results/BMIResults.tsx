import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface BMIResultsProps {
  bmi: {
    standard: number;
    devine: number;
    athletic: number;
  };
}

const getBMIColor = (bmi: number) => {
  if (bmi < 18.5) return "text-blue-600";
  if (bmi < 25) return "text-green-600";
  if (bmi < 30) return "text-yellow-600";
  return "text-red-600";
};

const BMIResults = ({ bmi }: BMIResultsProps) => {
  const tooltipContent = {
    standard: "Standard BMI Formula: weight (kg) / (height (m))²\nWidely used but doesn't account for muscle mass or body composition.",
    devine: "Devine Formula: Adjusted BMI calculation that considers frame size.\nFormula: (weight × 703) / (height in inches)²",
    athletic: "Athletic BMI: Modified formula for athletes and highly active individuals.\nConsiders higher muscle mass typical in athletes."
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">BMI Results</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {Object.entries(bmi).map(([key, value]) => (
          <div key={key} className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="inline-flex items-center w-full">
                  <div className="w-full">
                    <div className="text-sm text-mint-800 font-medium capitalize">{key} BMI</div>
                    <div className={`text-2xl font-semibold ${getBMIColor(value)}`}>
                      {value.toFixed(1)}
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
        ))}
      </div>
    </div>
  );
};

export default BMIResults;