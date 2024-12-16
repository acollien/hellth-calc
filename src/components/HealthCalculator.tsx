import { Card } from "@/components/ui/card";
import { useHealth } from "@/contexts/HealthContext";
import { useBasicMetrics } from "@/hooks/useBasicMetrics";
import { useBodyCompositionMetrics } from "@/hooks/useBodyCompositionMetrics";
import { useBodyIndicesMetrics } from "@/hooks/useBodyIndicesMetrics";
import BasicMeasurements from "./health/BasicMeasurements";
import BodyMeasurements from "./health/BodyMeasurements";
import SkinFoldMeasurements from "./health/SkinFoldMeasurements";
import ActivityLevel from "./health/ActivityLevel";
import { HealthMetrics } from "./health/types";
import Header from "./health/Header";
import ResultsContainer from "./health/results/ResultsContainer";

const HealthCalculator = () => {
  const { state, dispatch } = useHealth();
  
  // Use all the calculation hooks
  useBasicMetrics();
  useBodyCompositionMetrics();
  useBodyIndicesMetrics();

  const handleMetricChange = (key: keyof HealthMetrics, value: string) => {
    dispatch({ type: 'UPDATE_METRIC', key, value });
  };

  const handleTestDataClick = (testData: HealthMetrics) => {
    dispatch({ type: 'SET_METRICS', metrics: testData });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in">
      <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-lg">
        <div className="space-y-8">
          <Header onTestDataClick={handleTestDataClick} />

          <div className="grid gap-6">
            <BasicMeasurements metrics={state.metrics} onMetricChange={handleMetricChange} />
            <BodyMeasurements metrics={state.metrics} onMetricChange={handleMetricChange} />
            <SkinFoldMeasurements metrics={state.metrics} onMetricChange={handleMetricChange} />
            <ActivityLevel metrics={state.metrics} onMetricChange={handleMetricChange} />
          </div>

          {state.results && <ResultsContainer results={state.results} metrics={state.metrics} />}
        </div>
      </Card>
    </div>
  );
};

export default HealthCalculator;