import { HealthMetrics } from '@/components/health/types';

export const calculateNavyBodyFat = (metrics: HealthMetrics): number | null => {
  if (!metrics.neck || !metrics.waist || !metrics.hip || !metrics.height || !metrics.gender) {
    return null;
  }

  // Convert all measurements to centimeters if in imperial
  const height = metrics.unit === 'imperial' ? Number(metrics.height) * 2.54 : Number(metrics.height);
  const neck = metrics.unit === 'imperial' ? Number(metrics.neck) * 2.54 : Number(metrics.neck);
  const waist = metrics.unit === 'imperial' ? Number(metrics.waist) * 2.54 : Number(metrics.waist);
  const hip = metrics.unit === 'imperial' ? Number(metrics.hip) * 2.54 : Number(metrics.hip);
  
  if (metrics.gender === 'male') {
    const logValue = Math.log10(waist - neck);
    return Math.max(0, Math.min(495 / (1.0324 - 0.19077 * logValue + 0.15456 * Math.log10(height)) - 450, 100));
  }
  
  const logValue = Math.log10(waist + hip - neck);
  return Math.max(0, Math.min(495 / (1.29579 - 0.35004 * logValue + 0.22100 * Math.log10(height)) - 450, 100));
};