import ResultsHeader from "./health/results/ResultsHeader";
import BMIResults from "./health/results/BMIResults";
import BodyFatResults from "./health/results/BodyFatResults";
import MetabolicResults from "./health/results/MetabolicResults";
import IdealWeightResults from "./health/results/IdealWeightResults";
import OtherResults from "./health/results/OtherResults";
import BiologicalAgeResults from "./health/results/BiologicalAgeResults";

interface ResultsProps {
  results: any;
}

const HealthResults = ({ results }: ResultsProps) => {
  console.log("HealthResults received results:", results);
  
  // Extract frameSize value, ensuring we handle all possible cases
  const frameSize = (() => {
    console.log("Processing frameSize from:", results.frameSize);
    
    // If frameSize is directly a string, use it
    if (typeof results.frameSize === 'string') {
      return results.frameSize;
    }
    
    // If frameSize is an object with _type property
    if (results.frameSize && typeof results.frameSize === 'object') {
      // First check for direct value
      if (results.frameSize.value && results.frameSize.value !== 'undefined') {
        return results.frameSize.value;
      }
      
      // Then check for _type
      if (results.frameSize._type && results.frameSize._type !== 'undefined') {
        return results.frameSize._type;
      }
    }
    
    return null;
  })();
  
  console.log("Final processed frameSize:", frameSize);
  
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