import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResultsProps {
  results: any;
}

const HealthResults = ({ results }: ResultsProps) => {
  const tooltipContent = {
    bmi: {
      standard: "Standard BMI Formula: weight (kg) / (height (m))²\nWidely used but doesn't account for muscle mass or body composition.",
      devine: "Devine Formula: Adjusted BMI calculation that considers frame size.\nFormula: (weight × 703) / (height in inches)²",
      athletic: "Athletic BMI: Modified formula for athletes and highly active individuals.\nConsiders higher muscle mass typical in athletes."
    },
    bodyFat: {
      navy: "U.S. Navy Method: Uses circumference measurements.\nMen: 86.010×log10(abdomen-neck) - 70.041×log10(height) + 36.76\nWomen: 163.205×log10(waist+hip-neck) - 97.684×log10(height) - 78.387",
      jackson: "Jackson-Pollock Method: Uses multiple skinfold measurements.\nConsidered one of the most accurate non-invasive methods.\nUses 3-7 site measurements for calculation.",
      bmiBased: "BMI-Based Estimation: Rough estimation using BMI correlation.\nLess accurate but requires minimal measurements."
    },
    bmr: {
      bmr: "Basal Metabolic Rate: Calories burned at complete rest.\nMifflin-St Jeor Formula:\nMen: (10 × weight) + (6.25 × height) - (5 × age) + 5\nWomen: (10 × weight) + (6.25 × height) - (5 × age) - 161",
      tdee: "Total Daily Energy Expenditure: BMR × Activity Factor\nSedentary: 1.2, Light: 1.375, Moderate: 1.55, Active: 1.725, Very Active: 1.9"
    },
    idealWeight: {
      robinson: "Robinson Formula (1983)\nMen: 52 + 1.9 kg per inch over 5 feet\nWomen: 49 + 1.7 kg per inch over 5 feet",
      miller: "Miller Formula (1983)\nMen: 56.2 + 1.41 kg per inch over 5 feet\nWomen: 53.1 + 1.36 kg per inch over 5 feet",
      devine: "Devine Formula (1974)\nMen: 50 + 2.3 kg per inch over 5 feet\nWomen: 45.5 + 2.3 kg per inch over 5 feet"
    },
    frameSize: "Body Frame Size Calculation\nBased on wrist circumference in relation to height.\nSmall, Medium, or Large classification.",
    waistToHip: "Waist-to-Hip Ratio: waist measurement / hip measurement\nMen: <0.9 (normal), >0.9 (high)\nWomen: <0.85 (normal), >0.85 (high)",
    biologicalAge: "Biological Age Estimation\nBased on various health metrics including BMI, activity level, and body composition.\nProvides estimated biological age vs chronological age."
  };

  const renderTooltip = (content: string, trigger: React.ReactNode) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="inline-flex items-center">
          {trigger}
          <Info className="h-4 w-4 ml-1 text-mint-500" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs whitespace-pre-line">
        <p className="text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="h-px bg-gray-200" />
      
      {results.bmi && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-mint-800">BMI Results</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
              {renderTooltip(
                tooltipContent.bmi.standard,
                <div>
                  <div className="text-sm text-mint-800 font-medium">Standard BMI</div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {results.bmi.standard.toFixed(1)}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
              {renderTooltip(
                tooltipContent.bmi.devine,
                <div>
                  <div className="text-sm text-mint-800 font-medium">Devine Formula</div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {results.bmi.devine.toFixed(1)}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
              {renderTooltip(
                tooltipContent.bmi.athletic,
                <div>
                  <div className="text-sm text-mint-800 font-medium">Athletic BMI</div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {results.bmi.athletic.toFixed(1)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {results.bodyFat && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-mint-800">Body Fat Percentage</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {results.bodyFat.navy !== null && (
              <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
                {renderTooltip(
                  tooltipContent.bodyFat.navy,
                  <div>
                    <div className="text-sm text-mint-800 font-medium">Navy Method</div>
                    <div className="text-2xl font-semibold text-mint-900">
                      {results.bodyFat.navy.toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>
            )}
            {results.bodyFat.jackson !== null && (
              <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
                {renderTooltip(
                  tooltipContent.bodyFat.jackson,
                  <div>
                    <div className="text-sm text-mint-800 font-medium">Jackson-Pollock</div>
                    <div className="text-2xl font-semibold text-mint-900">
                      {results.bodyFat.jackson.toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>
            )}
            {results.bodyFat.bmiBased !== null && (
              <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
                {renderTooltip(
                  tooltipContent.bodyFat.bmiBased,
                  <div>
                    <div className="text-sm text-mint-800 font-medium">BMI-Based</div>
                    <div className="text-2xl font-semibold text-mint-900">
                      {results.bodyFat.bmiBased.toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {results.bmr && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-mint-800">Metabolic Rates</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
              {renderTooltip(
                tooltipContent.bmr.bmr,
                <div>
                  <div className="text-sm text-mint-800 font-medium">BMR (calories/day)</div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {Math.round(results.bmr.bmr)}
                  </div>
                </div>
              )}
            </div>
            {results.bmr.tdee && (
              <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
                {renderTooltip(
                  tooltipContent.bmr.tdee,
                  <div>
                    <div className="text-sm text-mint-800 font-medium">TDEE (calories/day)</div>
                    <div className="text-2xl font-semibold text-mint-900">
                      {Math.round(results.bmr.tdee)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {results.idealWeight && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-mint-800">Ideal Weight Range (kg)</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
              {renderTooltip(
                tooltipContent.idealWeight.robinson,
                <div>
                  <div className="text-sm text-mint-800 font-medium">Robinson Formula</div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {results.idealWeight.robinson.toFixed(1)}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
              {renderTooltip(
                tooltipContent.idealWeight.miller,
                <div>
                  <div className="text-sm text-mint-800 font-medium">Miller Formula</div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {results.idealWeight.miller.toFixed(1)}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
              {renderTooltip(
                tooltipContent.idealWeight.devine,
                <div>
                  <div className="text-sm text-mint-800 font-medium">Devine Formula</div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {results.idealWeight.devine.toFixed(1)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {results.frameSize && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          {renderTooltip(
            tooltipContent.frameSize,
            <div>
              <div className="text-sm text-mint-800 font-medium">Body Frame Size</div>
              <div className="text-2xl font-semibold text-mint-900 capitalize">
                {results.frameSize}
              </div>
            </div>
          )}
        </div>
      )}

      {results.waistToHip && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          {renderTooltip(
            tooltipContent.waistToHip,
            <div>
              <div className="text-sm text-mint-800 font-medium">Waist-to-Hip Ratio</div>
              <div className="text-2xl font-semibold text-mint-900">
                {results.waistToHip.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      )}

      {results.biologicalAge && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          {renderTooltip(
            tooltipContent.biologicalAge,
            <div>
              <div className="text-sm text-mint-800 font-medium">Estimated Biological Age</div>
              <div className="text-2xl font-semibold text-mint-900">
                {results.biologicalAge} years
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthResults;