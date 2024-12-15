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
  console.log("HealthResults received full results:", results);
  
  // Extract frameSize value, ensuring we handle all possible cases
  const frameSize = (() => {
    if (!results) return null;
    
    // Direct access to frameSize property
    const rawFrameSize = results.frameSize;
    console.log("Raw frameSize value:", rawFrameSize);
    
    // If it's a string and valid, return it
    if (typeof rawFrameSize === 'string' && 
        ['small', 'medium', 'large'].includes(rawFrameSize.toLowerCase())) {
      return rawFrameSize;
    }
    
    // If it's an object, try to get the value
    if (rawFrameSize && typeof rawFrameSize === 'object') {
      // Check value property
      if (rawFrameSize.value && 
          typeof rawFrameSize.value === 'string' && 
          rawFrameSize.value !== 'undefined') {
        return rawFrameSize.value;
      }
      
      // Check _type property
      if (rawFrameSize._type && 
          typeof rawFrameSize._type === 'string' && 
          rawFrameSize._type !== 'undefined') {
        return rawFrameSize._type;
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