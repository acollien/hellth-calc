import ResultsHeader from "./health/results/ResultsHeader";
import BMIResults from "./health/results/BMIResults";
import BodyFatResults from "./health/results/BodyFatResults";
import MetabolicResults from "./health/results/MetabolicResults";
import IdealWeightResults from "./health/results/IdealWeightResults";
import OtherResults from "./health/results/OtherResults";
import BiologicalAgeResults from "./health/results/BiologicalAgeResults";
import { HealthResult } from "@/types/health";
import Group1Results from "./health/results/Group1Results";
import Group2Results from "./health/results/Group2Results";
import Group3Results from "./health/results/Group3Results";

interface ResultsProps {
  results: HealthResult;
  metrics: { gender: 'male' | 'female' | '', unit: 'metric' | 'imperial' };
}

const HealthResults = ({ results, metrics }: ResultsProps) => {
  console.log("HealthResults received full results:", results);
  
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

      <Group1Results
        ponderalIndex={results.ponderalIndex || null}
        absi={results.absi || null}
        bodyRoundnessIndex={results.bodyRoundnessIndex || null}
        waistToHeightRatio={results.waistToHeightRatio || null}
        unit={metrics.unit}
      />

      <Group2Results
        leanBodyMass={results.leanBodyMass}
        fatFreeMassIndex={results.fatFreeMassIndex}
        skeletalMuscleMass={results.skeletalMuscleMass}
        bodyFatDistribution={results.bodyFatDistribution}
        unit={metrics.unit}
      />

      <Group3Results
        leanMassIndex={results.leanMassIndex}
        bodyAdiposityIndex={results.bodyAdiposityIndex}
        conicityIndex={results.conicityIndex}
        unit={metrics.unit}
      />

      <OtherResults 
        frameSize={results.frameSize}
        waistToHip={results.waistToHip}
      />
    </div>
  );
};

export default HealthResults;