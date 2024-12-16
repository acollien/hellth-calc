import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useHealth } from "@/contexts/HealthContext";
import BasicMeasurements from "./health/BasicMeasurements";
import BodyMeasurements from "./health/BodyMeasurements";
import SkinFoldMeasurements from "./health/SkinFoldMeasurements";
import ActivityLevel from "./health/ActivityLevel";
import { HealthMetrics } from "./health/types";
import Header from "./health/Header";
import HealthResults from "./HealthResults";
import { calculateBMI } from "@/utils/health/calculations/bmi";
import { calculateBMR } from "@/utils/health/calculations/bmr";
import { calculateIdealWeight } from "@/utils/health/calculations/idealWeight";
import { calculateBiologicalAge } from "@/utils/health/calculations/biologicalAge";
import { calculateBodyFat } from "@/utils/health/bodyFat";
import { calculateABSI, calculateBodyRoundnessIndex, calculatePonderalIndex } from "@/utils/health/indices";
import { calculateWaistToHipRatio, calculateWaistToHeightRatio } from "@/utils/health/metrics";
import { calculateFrameSize } from "@/utils/health/metrics/frameSize";

const HealthCalculator = () => {
  const { state, dispatch } = useHealth();
  
  console.log('Current state in HealthCalculator:', state);

  const calculateAllMetrics = () => {
    const metrics = state.metrics;
    if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) {
      console.log('Missing required basic metrics');
      return;
    }

    try {
      const height = parseFloat(metrics.height);
      const weight = parseFloat(metrics.weight);
      const results: any = {};

      // Calculate BMI
      results.bmi = calculateBMI(height, weight);
      console.log('Calculated BMI:', results.bmi);

      // Calculate BMR and TDEE
      results.bmr = calculateBMR(metrics);
      console.log('Calculated BMR:', results.bmr);

      // Calculate Ideal Weight
      results.idealWeight = calculateIdealWeight(height, metrics.gender);
      console.log('Calculated Ideal Weight:', results.idealWeight);

      // Calculate Biological Age
      results.biologicalAge = calculateBiologicalAge(metrics);
      console.log('Calculated Biological Age:', results.biologicalAge);

      // Calculate Body Fat if required measurements are present
      if (metrics.neck && metrics.waist && metrics.hip) {
        results.bodyFat = calculateBodyFat(metrics);
        console.log('Calculated Body Fat:', results.bodyFat);
      }

      // Calculate Body Indices if waist measurement is present
      if (metrics.waist) {
        results.absi = calculateABSI(
          parseFloat(metrics.waist),
          height,
          weight,
          metrics.unit
        );
        
        results.bodyRoundnessIndex = calculateBodyRoundnessIndex(
          parseFloat(metrics.waist),
          height,
          metrics.unit
        );

        results.waistToHeightRatio = calculateWaistToHeightRatio(
          parseFloat(metrics.waist),
          height
        );
      }

      // Calculate Ponderal Index
      results.ponderalIndex = calculatePonderalIndex(height, weight, metrics.unit);

      // Calculate Frame Size if wrist measurement is present
      if (metrics.wrist) {
        results.frameSize = calculateFrameSize({
          height,
          wrist: parseFloat(metrics.wrist),
          gender: metrics.gender,
          unit: metrics.unit
        });
      }

      // Calculate Waist to Hip Ratio if both measurements are present
      if (metrics.waist && metrics.hip) {
        results.waistToHip = calculateWaistToHipRatio(metrics);
      }

      console.log('Final calculated results:', results);
      dispatch({ type: 'SET_RESULTS', results });

    } catch (error) {
      console.error('Error calculating metrics:', error);
    }
  };

  // Calculate all metrics when relevant measurements change
  useEffect(() => {
    calculateAllMetrics();
  }, [
    state.metrics.height,
    state.metrics.weight,
    state.metrics.age,
    state.metrics.gender,
    state.metrics.neck,
    state.metrics.waist,
    state.metrics.hip,
    state.metrics.wrist,
    state.metrics.forearm,
    state.metrics.activityLevel,
    state.metrics.unit
  ]);

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