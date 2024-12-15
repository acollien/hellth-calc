import { HealthMetrics } from '@/components/health/types';

export const calculateNavyBodyFat = (metrics: HealthMetrics): number | null => {
  if (!metrics.neck || !metrics.waist || !metrics.hip || !metrics.height || !metrics.gender) {
    return null;
  }

  const neck = Number(metrics.neck);
  const waist = Number(metrics.waist);
  const hip = Number(metrics.hip);
  const height = Number(metrics.height);
  
  if (metrics.gender === 'male') {
    return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  }
  
  return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
};