import { HealthMetrics } from '@/components/health/types';

export const calculateSkeletalMuscleMass = (metrics: HealthMetrics): number | null => {
  console.log('Calculating skeletal muscle mass with metrics:', metrics);
  if (!metrics.weight || !metrics.height || !metrics.age || !metrics.gender) return null;

  const weight = metrics.unit === 'metric' ? parseFloat(metrics.weight) : parseFloat(metrics.weight) * 0.453592;
  const height = metrics.unit === 'metric' ? parseFloat(metrics.height) : parseFloat(metrics.height) * 2.54;
  const age = parseFloat(metrics.age);
  
  // Lee et al. (2000) equation
  const genderFactor = metrics.gender === 'male' ? 1.0 : 0;
  const smm = (0.244 * weight) + (0.117 * height) - (0.127 * age) + (10.8 * genderFactor) + 2.98;

  console.log('Calculated skeletal muscle mass:', smm);
  return Math.max(0, smm);
};