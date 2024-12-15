import ResultsHeader from "./health/results/ResultsHeader";
import BMIResults from "./health/results/BMIResults";
import BodyFatResults from "./health/results/BodyFatResults";
import MetabolicResults from "./health/results/MetabolicResults";
import IdealWeightResults from "./health/results/IdealWeightResults";
import OtherResults from "./health/results/OtherResults";

interface ResultsProps {
  results: any;
}

const HealthResults = ({ results }: ResultsProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <ResultsHeader results={results} />
      
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