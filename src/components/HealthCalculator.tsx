import React from "react";
import { Card } from "@/components/ui/card";
import { useHealth } from "@/contexts/HealthContext";
import BasicMeasurements from "./health/BasicMeasurements";
import BodyMeasurements from "./health/BodyMeasurements";
import SkinFoldMeasurements from "./health/SkinFoldMeasurements";
import ActivityLevel from "./health/ActivityLevel";
import { HealthMetrics } from "./health/types";
import Header from "./health/Header";
import HealthResults from "./HealthResults";
import { useHealthMetricsCalculator } from "@/hooks/useHealthMetricsCalculator";

const HealthCalculator = () => {
  const { state, dispatch } = useHealth();
  
  console.log('Current state in HealthCalculator:', state);

  useHealthMetricsCalculator({
    metrics: state.metrics,
    onResultsCalculated: (results) => {
      dispatch({ type: 'SET_RESULTS', results });
    }
  });

  const handleMetricChange = (key: keyof HealthMetrics, value: string) => {
    console.log('Metric changed:', key, value);
    dispatch({ type: 'UPDATE_METRIC', key, value });
  };

  const handleTestDataClick = (testData: HealthMetrics) => {
    console.log('Setting test data:', testData);
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

          {state.results && (
            <HealthResults 
              results={state.results} 
              metrics={{
                gender: state.metrics.gender as 'male' | 'female' | '',
                unit: state.metrics.unit as 'metric' | 'imperial'
              }} 
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default HealthCalculator;