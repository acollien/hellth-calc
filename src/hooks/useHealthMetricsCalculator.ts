import { useEffect } from 'react';
import { HealthMetrics, HealthResult } from "@/components/health/types";
import { calculateBMI } from "@/utils/health/calculations/bmi";
import { calculateBMR } from "@/utils/health/calculations/bmr";
import { calculateIdealWeight } from "@/utils/health/calculations/idealWeight";
import { calculateBiologicalAge } from "@/utils/health/calculations/biologicalAge";
import { calculateBodyFat } from "@/utils/health/bodyFat";
import { 
  calculateABSI, 
  calculateBodyRoundnessIndex, 
  calculatePonderalIndex 
} from "@/utils/health/indices";
import { 
  calculateWaistToHipRatio, 
  calculateWaistToHeightRatio 
} from "@/utils/health/metrics";
import { calculateFrameSize } from "@/utils/health/metrics/frameSize";

interface UseHealthMetricsCalculatorProps {
  metrics: HealthMetrics;
  onResultsCalculated: (results: Partial<HealthResult>) => void;
}

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
      const numericMetrics = {
        height: parseFloat(metrics.height),
        weight: parseFloat(metrics.weight),
        age: parseFloat(metrics.age),
        gender: metrics.gender,
        unit: metrics.unit,
        ...(metrics.neck && { neck: parseFloat(metrics.neck) }),
        ...(metrics.waist && { waist: parseFloat(metrics.waist) }),
        ...(metrics.hip && { hip: parseFloat(metrics.hip) }),
        ...(metrics.wrist && { wrist: parseFloat(metrics.wrist) }),
        ...(metrics.forearm && { forearm: parseFloat(metrics.forearm) }),
        ...(metrics.activityLevel && { activityLevel: metrics.activityLevel })
      };

      const results: Partial<HealthResult> = {};

      // Calculate BMI
      results.bmi = calculateBMI(numericMetrics.height, numericMetrics.weight);
      console.log('Calculated BMI:', results.bmi);

      // Calculate BMR and TDEE
      if (metrics.activityLevel) {
        results.bmr = calculateBMR({
          height: numericMetrics.height,
          weight: numericMetrics.weight,
          age: numericMetrics.age,
          gender: metrics.gender,
          unit: metrics.unit,
          activityLevel: metrics.activityLevel
        });
        console.log('Calculated BMR:', results.bmr);
      }

      // Calculate Ideal Weight
      results.idealWeight = calculateIdealWeight(numericMetrics.height, metrics.gender);
      console.log('Calculated Ideal Weight:', results.idealWeight);

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