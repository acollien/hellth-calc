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
      // Convert string measurements to numbers for calculations
      const numericMetrics: Record<string, any> = {
        height: parseFloat(metrics.height),
        weight: parseFloat(metrics.weight),
        age: parseFloat(metrics.age),
        gender: metrics.gender,
        unit: metrics.unit,
        activityLevel: metrics.activityLevel || undefined
      };

      // Only add measurements that exist and can be converted to numbers
      const optionalMeasurements = [
        'neck', 'waist', 'hip', 'wrist', 'forearm',
        'chestSkinfold', 'midaxillarySkinfold', 'suprailiacSkinfold',
        'thighSkinfold', 'umbilicalSkinfold', 'tricepsSkinfold',
        'subscapularSkinfold', 'calfSkinfold', 'midaxillarySkinfold2'
      ];

      optionalMeasurements.forEach(measurement => {
        if (metrics[measurement as keyof HealthMetrics]) {
          numericMetrics[measurement] = parseFloat(metrics[measurement as keyof HealthMetrics]);
        }
      });

      const results: any = {};

      // Calculate BMI
      results.bmi = calculateBMI(numericMetrics.height, numericMetrics.weight);
      console.log('Calculated BMI:', results.bmi);

      // Calculate BMR and TDEE
      if (metrics.activityLevel) {
        results.bmr = calculateBMR({
          ...numericMetrics,
          activityLevel: metrics.activityLevel
        });
        console.log('Calculated BMR:', results.bmr);
      }

      // Calculate Ideal Weight
      if (metrics.gender) {
        results.idealWeight = calculateIdealWeight(numericMetrics.height, metrics.gender);
        console.log('Calculated Ideal Weight:', results.idealWeight);
      }

      // Calculate Biological Age
      results.biologicalAge = calculateBiologicalAge(numericMetrics);
      console.log('Calculated Biological Age:', results.biologicalAge);

      // Calculate Body Fat if required measurements are present
      if (numericMetrics.neck && numericMetrics.waist && numericMetrics.hip) {
        results.bodyFat = calculateBodyFat(metrics);
        console.log('Calculated Body Fat:', results.bodyFat);
      }

      // Calculate Body Indices if waist measurement is present
      if (numericMetrics.waist) {
        results.absi = calculateABSI(
          numericMetrics.waist,
          numericMetrics.height,
          numericMetrics.weight,
          metrics.unit
        );
        
        results.bodyRoundnessIndex = calculateBodyRoundnessIndex(
          numericMetrics.waist,
          numericMetrics.height,
          metrics.unit
        );

        results.waistToHeightRatio = calculateWaistToHeightRatio(
          numericMetrics.waist,
          numericMetrics.height
        );
      }

      // Calculate Ponderal Index
      results.ponderalIndex = calculatePonderalIndex(
        numericMetrics.height,
        numericMetrics.weight,
        metrics.unit
      );

      // Calculate Frame Size if wrist measurement is present
      if (numericMetrics.wrist) {
        results.frameSize = calculateFrameSize({
          height: numericMetrics.height,
          wrist: numericMetrics.wrist,
          gender: metrics.gender,
          unit: metrics.unit
        });
      }

      // Calculate Waist to Hip Ratio if both measurements are present
      if (numericMetrics.waist && numericMetrics.hip) {
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