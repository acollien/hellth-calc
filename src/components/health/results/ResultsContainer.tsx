import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportResults } from "@/utils/exportResults";
import HealthResults from "@/components/HealthResults";
import Group1Results from "./Group1Results";
import Group2Results from "./Group2Results";
import Group3Results from "./Group3Results";
import Group4Results from "./Group4Results";

interface ResultsContainerProps {
  results: any;
  metrics: { unit: 'metric' | 'imperial' };
}

const ResultsContainer = ({ results, metrics }: ResultsContainerProps) => {
  const handleExport = () => {
    exportResults(results);
  };

  return (
    <div className="space-y-8">
      <HealthResults results={results} />
      <Group1Results
        ponderalIndex={results.ponderalIndex}
        absi={results.absi}
        bodyRoundnessIndex={results.bodyRoundnessIndex}
        waistToHeightRatio={results.waistToHeightRatio}
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
      {results.bmi && results.bodyFat && results.bmr && (
        <Group4Results
          bmi={results.bmi.standard}
          bodyFat={results.bodyFat.navy || results.bodyFat.jackson || results.bodyFat.bmiBased}
          bmr={results.bmr.bmr}
          unit={metrics.unit}
        />
      )}
    </div>
  );
};

export default ResultsContainer;