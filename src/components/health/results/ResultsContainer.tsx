import { Card } from "@/components/ui/card";
import { HealthResult } from "@/types/health";
import HealthResults from "@/components/HealthResults";
import Group1Results from "./Group1Results";
import Group2Results from "./Group2Results";
import Group3Results from "./Group3Results";
import ProjectedResults from "./ProjectedResults";

interface ResultsContainerProps {
  results: HealthResult;
  metrics: { unit: 'metric' | 'imperial', gender: 'male' | 'female' | '' };
}

const ResultsContainer = ({ results, metrics }: ResultsContainerProps) => {
  console.log("ResultsContainer received results:", results);
  
  return (
    <div className="space-y-8">
      <HealthResults results={results} metrics={metrics} />

      {/* Body Indices */}
      <Group1Results
        ponderalIndex={results.ponderalIndex}
        absi={results.absi}
        bodyRoundnessIndex={results.bodyRoundnessIndex}
        waistToHeightRatio={results.waistToHeightRatio}
        waistToHip={results.waistToHip}
        unit={metrics.unit}
      />

      {/* Body Composition */}
      <Group2Results
        leanBodyMass={results.leanBodyMass}
        fatFreeMassIndex={results.fatFreeMassIndex}
        skeletalMuscleMass={results.skeletalMuscleMass}
        bodyFatDistribution={results.bodyFatDistribution}
        frameSize={results.frameSize}
        unit={metrics.unit}
      />

      {/* Additional Metrics */}
      <Group3Results
        leanMassIndex={results.leanMassIndex}
        bodyAdiposityIndex={results.bodyAdiposityIndex}
        conicityIndex={results.conicityIndex}
        unit={metrics.unit}
      />

      {/* Projected Results */}
      {results.bmi && results.bodyFat && results.bmr && (
        <ProjectedResults
          bmi={{
            standard: results.bmi.standard,
            devine: results.bmi.devine,
            athletic: results.bmi.athletic,
            bmiBased: results.bmi.bmiBased
          }}
          bodyFat={results.bodyFat}
          bmr={results.bmr}
          unit={metrics.unit}
        />
      )}
    </div>
  );
};

export default ResultsContainer;