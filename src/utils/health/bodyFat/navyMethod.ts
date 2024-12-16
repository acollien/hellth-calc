import { HealthMetrics } from '@/components/health/types';

export const calculateNavyBodyFat = (metrics: HealthMetrics): number | null => {
  if (!metrics.neck || !metrics.waist || !metrics.hip || !metrics.height || !metrics.gender) {
    return null;
  }

  const height = parseFloat(metrics.height);
  const neck = parseFloat(metrics.neck);
  const waist = parseFloat(metrics.waist);
  const hip = parseFloat(metrics.hip);
  
  if (metrics.gender === 'male') {
    return Math.max(0, Math.min(
      495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450,
      100
    ));
  }
  
  return Math.max(0, Math.min(
    495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450,
    100
  ));
};