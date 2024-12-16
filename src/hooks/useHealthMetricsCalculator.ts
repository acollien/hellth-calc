import { useEffect } from 'react';
import { HealthMetrics, NumericHealthMetrics, HealthResult } from "@/types/health";
import { calculateBMI } from "@/utils/health/calculations/bmi";
import { calculateBMR } from "@/utils/health/calculations/bmr";
import { calculateIdealWeight } from "@/utils/health/calculations/idealWeight";
import { calculateBiologicalAge } from "@/utils/health/calculations/biologicalAge";
import { calculateBodyFat } from "@/utils/health/bodyFat";
import { 
  calculateABSI, 
  calculateBodyRoundnessIndex, 
  calculatePonderalIndex,
  calculateBodyAdiposityIndex,
  calculateConicityIndex
} from "@/utils/health/indices";
import { 
  calculateWaistToHipRatio, 
  calculateWaistToHeightRatio 
} from "@/utils/health/metrics";
import { calculateFrameSize } from "@/utils/health/metrics/frameSize";
import { calculateLeanMassIndex } from "@/utils/health/calculations/leanMassIndex";

// Add new calculation functions
const calculateFatFreeMassIndex = (weight: number, height: number, bodyFat: number): number => {
  const fatFreeMass = weight * (1 - bodyFat / 100);
  return fatFreeMass / ((height / 100) * (height / 100));
};

const calculateSkeletalMuscleMass = (weight: number, bodyFat: number): number => {
  // Approximate skeletal muscle mass using lean body mass
  const leanMass = weight * (1 - bodyFat / 100);
  return leanMass * 0.6; // Skeletal muscle typically accounts for ~60% of lean mass
};

const calculateBodyFatDistribution = (waist: number, hip: number): number => {
  return (waist / hip) * 100;
};

const calculateLeanBodyMass = (weight: number, bodyFat: number): number => {
  return weight * (1 - bodyFat / 100);
};

interface UseHealthMetricsCalculatorProps {
  metrics: HealthMetrics;
  onResultsCalculated: (results: Partial<HealthResult>) => void;
}

const convertToNumericMetrics = (metrics: HealthMetrics): NumericHealthMetrics | null => {
  if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) {
    return null;
  }

  const numericMetrics: NumericHealthMetrics = {
    height: parseFloat(metrics.height),
    weight: parseFloat(metrics.weight),
    age: parseFloat(metrics.age),
    gender: metrics.gender as 'male' | 'female',
    unit: metrics.unit,
    ...(metrics.neck ? { neck: parseFloat(metrics.neck) } : {}),
    ...(metrics.waist ? { waist: parseFloat(metrics.waist) } : {}),
    ...(metrics.hip ? { hip: parseFloat(metrics.hip) } : {}),
    ...(metrics.wrist ? { wrist: parseFloat(metrics.wrist) } : {}),
    ...(metrics.forearm ? { forearm: parseFloat(metrics.forearm) } : {}),
    ...(metrics.chestSkinfold ? { chestSkinfold: parseFloat(metrics.chestSkinfold) } : {}),
    ...(metrics.midaxillarySkinfold ? { midaxillarySkinfold: parseFloat(metrics.midaxillarySkinfold) } : {}),
    ...(metrics.suprailiacSkinfold ? { suprailiacSkinfold: parseFloat(metrics.suprailiacSkinfold) } : {}),
    ...(metrics.thighSkinfold ? { thighSkinfold: parseFloat(metrics.thighSkinfold) } : {}),
    ...(metrics.umbilicalSkinfold ? { umbilicalSkinfold: parseFloat(metrics.umbilicalSkinfold) } : {}),
    ...(metrics.tricepsSkinfold ? { tricepsSkinfold: parseFloat(metrics.tricepsSkinfold) } : {}),
    ...(metrics.subscapularSkinfold ? { subscapularSkinfold: parseFloat(metrics.subscapularSkinfold) } : {}),
    ...(metrics.calfSkinfold ? { calfSkinfold: parseFloat(metrics.calfSkinfold) } : {}),
    ...(metrics.activityLevel ? { activityLevel: metrics.activityLevel } : {})
  };

  return numericMetrics;
};

export const useHealthMetricsCalculator = ({ 
  metrics, 
  onResultsCalculated 
}: UseHealthMetricsCalculatorProps) => {
  
  useEffect(() => {
    if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) {
      console.log('Missing required basic metrics');
      return;
    }

    try {
      const numericMetrics = convertToNumericMetrics(metrics);
      if (!numericMetrics) {
        console.log('Failed to convert metrics to numeric values');
        return;
      }

      const results: Partial<HealthResult> = {};

      // Calculate existing metrics
      results.bmi = calculateBMI(numericMetrics.height, numericMetrics.weight);
      
      if (metrics.activityLevel) {
        results.bmr = calculateBMR(metrics);
      }

      results.idealWeight = calculateIdealWeight(numericMetrics.height, metrics.gender);
      results.biologicalAge = calculateBiologicalAge(metrics);

      // Calculate body fat if required measurements are present
      if (numericMetrics.neck && numericMetrics.waist && numericMetrics.hip) {
        results.bodyFat = calculateBodyFat(metrics);
        
        // Calculate additional metrics that depend on body fat
        if (results.bodyFat.navy) {
          const bodyFatPercentage = results.bodyFat.navy;
          const weight = numericMetrics.weight;
          const height = numericMetrics.height;

          // Add new calculations
          results.leanBodyMass = calculateLeanBodyMass(weight, bodyFatPercentage);
          results.fatFreeMassIndex = calculateFatFreeMassIndex(weight, height, bodyFatPercentage);
          results.skeletalMuscleMass = calculateSkeletalMuscleMass(weight, bodyFatPercentage);
        }
      }

      // Calculate body indices if waist measurement is present
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

        // Add new calculations
        if (numericMetrics.hip) {
          results.bodyFatDistribution = calculateBodyFatDistribution(
            numericMetrics.waist,
            numericMetrics.hip
          );

          results.bodyAdiposityIndex = calculateBodyAdiposityIndex(metrics);
          results.conicityIndex = calculateConicityIndex(metrics);
        }
      }

      // Calculate Ponderal Index
      results.ponderalIndex = calculatePonderalIndex(
        numericMetrics.height,
        numericMetrics.weight,
        metrics.unit
      );

      // Calculate Lean Mass Index if body fat is available
      if (results.bodyFat) {
        results.leanMassIndex = calculateLeanMassIndex(metrics);
      }

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
      onResultsCalculated(results);

    } catch (error) {
      console.error('Error calculating metrics:', error);
    }
  }, [
    metrics.height,
    metrics.weight,
    metrics.age,
    metrics.gender,
    metrics.neck,
    metrics.waist,
    metrics.hip,
    metrics.wrist,
    metrics.forearm,
    metrics.activityLevel,
    metrics.unit,
    onResultsCalculated
  ]);
};