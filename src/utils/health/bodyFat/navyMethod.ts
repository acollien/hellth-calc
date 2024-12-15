import { HealthMetrics } from '../types';

export const calculateNavyBodyFat = (metrics: HealthMetrics): number | null => {
  console.log('Calculating Navy method body fat with metrics:', metrics);
  
  if (!metrics.neck || !metrics.waist || !metrics.hip || !metrics.height || !metrics.gender) {
    return null;
  }

  const { neck, waist, hip, height, gender } = metrics;
  
  if (gender === 'male') {
    return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  }
  
  return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
};