import { HealthMetrics } from './types';
import { calculateBodyFat } from './bodyFat';

export { calculateBodyFat };

export const calculateLeanBodyMass = (metrics: HealthMetrics): number | null => {
  console.log('Calculating lean body mass with metrics:', metrics);
  if (!metrics.weight || !metrics.height || !metrics.gender) return null;

  const weight = metrics.unit === 'metric' ? metrics.weight : metrics.weight * 0.453592;
  const height = metrics.unit === 'metric' ? metrics.height : metrics.height * 2.54;

  // Boer Formula
  return metrics.gender === 'male'
    ? (0.407 * weight) + (0.267 * height) - 19.2
    : (0.252 * weight) + (0.473 * height) - 48.3;
};

export const calculateFatFreeMassIndex = (metrics: HealthMetrics): number | null => {
  console.log('Calculating fat-free mass index with metrics:', metrics);
  const lbm = calculateLeanBodyMass(metrics);
  if (!lbm || !metrics.height) return null;

  const heightInMeters = metrics.unit === 'metric' ? metrics.height / 100 : metrics.height * 0.0254;
  return lbm / (heightInMeters * heightInMeters);
};

export const calculateSkeletalMuscleMass = (metrics: HealthMetrics): number | null => {
  console.log('Calculating skeletal muscle mass with metrics:', metrics);
  if (!metrics.weight || !metrics.height || !metrics.age || !metrics.gender) return null;

  const weight = metrics.unit === 'metric' ? metrics.weight : metrics.weight * 0.453592;
  const height = metrics.unit === 'metric' ? metrics.height : metrics.height * 2.54;
  
  const genderFactor = metrics.gender === 'male' ? 2.29 : 0;
  return (0.244 * weight) + (0.117 * height) - (0.127 * metrics.age) + genderFactor - 2.98;
};

export const calculateBodyFatDistributionIndex = (metrics: HealthMetrics): number | null => {
  console.log('Calculating body fat distribution index with metrics:', metrics);
  if (!metrics.waist || !metrics.hip || !metrics.height) return null;

  const waist = metrics.unit === 'metric' ? metrics.waist : metrics.waist * 2.54;
  const hip = metrics.unit === 'metric' ? metrics.hip : metrics.hip * 2.54;
  const height = metrics.unit === 'metric' ? metrics.height : metrics.height * 2.54;

  return (waist * waist) / (hip * height);
};