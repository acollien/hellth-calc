import { calculateBodyFat } from './bodyFat';
import { calculateLeanBodyMass } from './leanMass';
import { calculateFatFreeMassIndex } from './fatFreeMass';
import { calculateSkeletalMuscleMass } from './muscleMass';
import { HealthMetrics } from "@/components/health/types";

export const calculateBodyFatDistribution = (metrics: HealthMetrics) => {
  if (!metrics.waist || !metrics.hip || !metrics.height) return null;
  
  const waist = parseFloat(metrics.waist);
  const hip = parseFloat(metrics.hip);
  const height = parseFloat(metrics.height);
  
  const result = (Math.pow(waist, 2) * height) / (Math.pow(hip, 2) * Math.sqrt(height));
  console.log('Calculated Body Fat Distribution:', result);
  return result;
};

export const calculateComposition = (metrics: HealthMetrics) => {
  console.log("Calculating composition with metrics:", metrics);
  
  const bodyFatDistribution = calculateBodyFatDistribution(metrics);
  console.log("Calculated bodyFatDistribution:", bodyFatDistribution);
  
  return {
    bodyFatDistribution
  };
};

export {
  calculateBodyFat,
  calculateLeanBodyMass,
  calculateFatFreeMassIndex,
  calculateSkeletalMuscleMass
};