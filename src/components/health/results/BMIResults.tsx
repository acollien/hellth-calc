import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import RangeBar from "@/components/health/visualizations/RangeBar";

interface BMIResultsProps {
  bmi: {
    standard: number;
    devine: number;
    athletic: number;
  };
}

const BMIResults = ({ bmi }: BMIResultsProps) => {
  const bmiRanges = [
    {
      min: 0,
      max: 18.5,
      label: "Underweight",
      color: "#D3E4FD",
      description: "BMI less than 18.5"
    },
    {
      min: 18.5,
      max: 24.9,
      label: "Normal",
      color: "#F2FCE2",
      description: "BMI between 18.5 and 24.9"
    },
    {
      min: 25,
      max: 29.9,
      label: "Overweight",
      color: "#FEC6A1",
      description: "BMI between 25 and 29.9"
    },
    {
      min: 30,
      max: 40,
      label: "Obese",
      color: "#ea384c",
      description: "BMI 30 or greater"
    }
  ];

  const getBMIDescription = (type: string) => {
    const descriptions = {
      standard: {
        title: "Standard BMI",
        formula: "Weight (kg) / Height² (m)",
        description: "The traditional Body Mass Index calculation. Most widely used but doesn't account for muscle mass or body composition.",
        interpretation: "• Under 18.5: Underweight\n• 18.5-24.9: Normal weight\n• 25-29.9: Overweight\n• 30+: Obese"
      },
      devine: {
        title: "Devine BMI",
        formula: "(Weight / Ideal Weight) × 21.7",
        description: "Adjusted BMI calculation that considers frame size and gender. More accurate for athletic builds.",
        interpretation: "Interpretation ranges are similar to standard BMI but better account for muscular builds."
      },
      athletic: {
        title: "Athletic BMI",
        formula: "Standard BMI × 0.9",
        description: "Modified BMI calculation specifically for athletic body types. Accounts for higher muscle mass.",
        interpretation: "Allows for 10% higher values than standard BMI due to muscle weight."
      }
    };
    return descriptions[type as keyof typeof descriptions];
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">BMI Results</h3>
      <div className="grid gap-4">
        {Object.entries(bmi).map(([key, value]) => {
          const info = getBMIDescription(key);
          return (
            <div key={key} className="p-4 rounded-lg bg-mint-50 border border-mint-100">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <div className="text-sm text-mint-800 font-medium capitalize flex items-center gap-2">
                    {info.title}
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-mint-500" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold">{info.title}</h4>
                          <div className="text-sm space-y-1">
                            <p className="font-medium">Formula:</p>
                            <p className="text-mint-700">{info.formula}</p>
                          </div>
                          <div className="text-sm space-y-1">
                            <p className="font-medium">Description:</p>
                            <p className="text-mint-700">{info.description}</p>
                          </div>
                          <div className="text-sm space-y-1">
                            <p className="font-medium">Interpretation:</p>
                            <pre className="text-mint-700 whitespace-pre-line">{info.interpretation}</pre>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {value.toFixed(1)}
                  </div>
                </div>
              </div>
              <RangeBar
                value={value}
                ranges={bmiRanges}
                max={40}
                unit="BMI"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BMIResults;