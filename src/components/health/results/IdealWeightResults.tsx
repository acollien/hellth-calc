import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface IdealWeightResultsProps {
  idealWeight: {
    robinson: number;
    miller: number;
    devine: number;
  };
}

const IdealWeightResults = ({ idealWeight }: IdealWeightResultsProps) => {
  const getValueColor = (value: number) => {
    // Color coding based on general weight ranges (in kg)
    if (value < 45) return "text-blue-600"; // Very low
    if (value < 55) return "text-green-600"; // Low normal
    if (value < 75) return "text-mint-600"; // Normal
    if (value < 85) return "text-yellow-600"; // High normal
    return "text-red-600"; // High
  };

  const getWeightRangeDescription = (value: number) => {
    if (value < 45) return "Very Low Weight Range";
    if (value < 55) return "Low Normal Weight Range";
    if (value < 75) return "Normal Weight Range";
    if (value < 85) return "High Normal Weight Range";
    return "High Weight Range";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Ideal Weight Range (kg)</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {Object.entries(idealWeight).map(([formula, value]) => (
          <div key={formula} className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                      {formula} Formula
                      <Info className="h-4 w-4 text-mint-500" />
                    </div>
                    <div className={`text-2xl font-semibold ${getValueColor(value)}`}>
                      {value.toFixed(1)}
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">{formula} Formula</h4>
                  <p>{getFormulaDescription(formula)}</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Formula:</p>
                    <p className="text-mint-700">{getFormula(formula)}</p>
                  </div>
                  <div className="mt-2 pt-2 border-t">
                    <p className="font-medium text-sm">Current Range:</p>
                    <p className={`text-sm ${getValueColor(value)}`}>
                      {getWeightRangeDescription(value)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Ranges (kg):
                      <br />
                      &lt;45: Very Low
                      <br />
                      45-54: Low Normal
                      <br />
                      55-74: Normal
                      <br />
                      75-84: High Normal
                      <br />
                      ≥85: High
                    </p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

const getFormulaDescription = (formula: string) => {
  switch (formula) {
    case 'robinson':
      return 'The Robinson formula (1983) is widely used in medical settings and provides a conservative estimate.';
    case 'miller':
      return 'The Miller formula (1983) tends to give the lowest estimates and may be more suitable for lean builds.';
    case 'devine':
      return 'The Devine formula (1974) is commonly used in clinical settings and provides a middle-ground estimate.';
    default:
      return '';
  }
};

const getFormula = (formula: string) => {
  switch (formula) {
    case 'robinson':
      return 'Men: 52 + 1.9 × (height in inches - 60)\nWomen: 49 + 1.7 × (height in inches - 60)';
    case 'miller':
      return 'Men: 56.2 + 1.41 × (height in inches - 60)\nWomen: 53.1 + 1.36 × (height in inches - 60)';
    case 'devine':
      return 'Men: 50 + 2.3 × (height in inches - 60)\nWomen: 45.5 + 2.3 × (height in inches - 60)';
    default:
      return '';
  }
};

export default IdealWeightResults;