import { HealthMetrics } from '@/components/health/types';

export const calculateLeanBodyMass = (metrics: HealthMetrics): number | null => {
  console.log('Calculating lean body mass with metrics:', metrics);
  if (!metrics.weight || !metrics.height || !metrics.gender) return null;

  const weight = metrics.unit === 'metric' ? parseFloat(metrics.weight) : parseFloat(metrics.weight) * 0.453592;
  const height = metrics.unit === 'metric' ? parseFloat(metrics.height) : parseFloat(metrics.height) * 2.54;

  // Boer Formula (1984)
  const lbm = metrics.gender === 'male'
    ? (0.407 * weight) + (0.267 * height) - 19.2
    : (0.252 * weight) + (0.473 * height) - 48.3;

  console.log('Calculated lean body mass:', lbm);
  return Math.max(0, lbm);
};