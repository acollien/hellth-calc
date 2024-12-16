import ResultsHeader from "./health/results/ResultsHeader";
import BMIResults from "./health/results/BMIResults";
import BodyFatResults from "./health/results/BodyFatResults";
import MetabolicResults from "./health/results/MetabolicResults";
import IdealWeightResults from "./health/results/IdealWeightResults";
import OtherResults from "./health/results/OtherResults";
import BiologicalAgeResults from "./health/results/BiologicalAgeResults";
import { HealthResult } from "@/types/health";

interface ResultsProps {
  results: HealthResult;
  metrics: { gender: 'male' | 'female' | '' };
}

const HealthResults = ({ results, metrics }: ResultsProps) => {
  console.log("HealthResults received full results:", results);
  
  // Extract frameSize value directly from results with proper typing
  const frameSize = results?.frameSize || null;
  console.log("Frame size value:", frameSize);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <ResultsHeader results={results} />
      
      <div className="h-px bg-gray-200" />
      
      {results.bmi && <BMIResults bmi={results.bmi} />}
      
      {results.bodyFat && metrics.gender && (
        <BodyFatResults 
          bodyFat={results.bodyFat} 
          gender={metrics.gender}
        />
      )}

      {results.bmr && <MetabolicResults bmr={results.bmr} />}

      {results.idealWeight && <IdealWeightResults idealWeight={results.idealWeight} />}

      {results.biologicalAge && (
        <BiologicalAgeResults biologicalAge={results.biologicalAge} />
      )}

      <OtherResults 
        frameSize={frameSize}
        waistToHip={results.waistToHip}
      />
    </div>
  );
};

export default HealthResults;