import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportResults } from "@/utils/exportResults";
import BMIResults from "./health/results/BMIResults";
import BodyFatResults from "./health/results/BodyFatResults";

interface ResultsProps {
  results: any;
}

const HealthResults = ({ results }: ResultsProps) => {
  const handleExport = () => {
    exportResults(results);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-mint-900">Your Results</h2>
        <Button
          onClick={handleExport}
          variant="outline"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Export Results
        </Button>
      </div>
      
      <div className="h-px bg-gray-200" />
      
      {results.bmi && <BMIResults bmi={results.bmi} />}
      
      {results.bodyFat && (
        <BodyFatResults 
          bodyFat={results.bodyFat} 
          gender={results.gender || 'male'} 
        />
      )}

      {results.bmr && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-mint-800">Metabolic Rates</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
              <div>
                <div className="text-sm text-mint-800 font-medium">BMR (calories/day)</div>
                <div className="text-2xl font-semibold text-mint-900">
                  {Math.round(results.bmr.bmr)}
                </div>
              </div>
            </div>
            {results.bmr.tdee && (
              <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
                <div>
                  <div className="text-sm text-mint-800 font-medium">TDEE (calories/day)</div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {Math.round(results.bmr.tdee)}
                  </div>
                </div>
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
              <div>
                <div className="text-sm text-mint-800 font-medium">Robinson Formula</div>
                <div className="text-2xl font-semibold text-mint-900">
                  {results.idealWeight.robinson.toFixed(1)}
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
              <div>
                <div className="text-sm text-mint-800 font-medium">Miller Formula</div>
                <div className="text-2xl font-semibold text-mint-900">
                  {results.idealWeight.miller.toFixed(1)}
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
              <div>
                <div className="text-sm text-mint-800 font-medium">Devine Formula</div>
                <div className="text-2xl font-semibold text-mint-900">
                  {results.idealWeight.devine.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {results.frameSize && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <div>
            <div className="text-sm text-mint-800 font-medium">Body Frame Size</div>
            <div className="text-2xl font-semibold text-mint-900 capitalize">
              {results.frameSize}
            </div>
          </div>
        </div>
      )}

      {results.waistToHip && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <div>
            <div className="text-sm text-mint-800 font-medium">Waist-to-Hip Ratio</div>
            <div className="text-2xl font-semibold text-mint-900">
              {results.waistToHip.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {results.biologicalAge && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <div>
            <div className="text-sm text-mint-800 font-medium">Estimated Biological Age</div>
            <div className="text-2xl font-semibold text-mint-900">
              {results.biologicalAge} years
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthResults;
