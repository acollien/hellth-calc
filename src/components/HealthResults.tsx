import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportResults } from "@/utils/exportResults";
import BMIResults from "./health/results/BMIResults";
import BodyFatResults from "./health/results/BodyFatResults";
import MetabolicResults from "./health/results/MetabolicResults";
import IdealWeightResults from "./health/results/IdealWeightResults";
import OtherResults from "./health/results/OtherResults";

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

      {results.bmr && <MetabolicResults bmr={results.bmr} />}

      {results.idealWeight && <IdealWeightResults idealWeight={results.idealWeight} />}

      <OtherResults 
        frameSize={results.frameSize}
        waistToHip={results.waistToHip}
        biologicalAge={results.biologicalAge}
      />
    </div>
  );
};

export default HealthResults;