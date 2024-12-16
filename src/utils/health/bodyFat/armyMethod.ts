import { HealthMetrics } from '@/components/health/types';

export const calculateArmyBodyFat = (metrics: HealthMetrics): number | null => {
  if (!metrics.gender || !metrics.neck || !metrics.waist || !metrics.height || 
      (metrics.gender === 'female' && !metrics.hip)) {
    return null;
  }

  // Convert all measurements to inches if in metric
  const heightInInches = metrics.unit === 'metric' ? Number(metrics.height) / 2.54 : Number(metrics.height);
  const neckInInches = metrics.unit === 'metric' ? Number(metrics.neck) / 2.54 : Number(metrics.neck);
  const waistInInches = metrics.unit === 'metric' ? Number(metrics.waist) / 2.54 : Number(metrics.waist);
  const hipInInches = metrics.gender === 'female' && metrics.hip ? 
    (metrics.unit === 'metric' ? Number(metrics.hip) / 2.54 : Number(metrics.hip)) : 0;

  let bodyFat: number;
  
  if (metrics.gender === 'male') {
    bodyFat = Math.max(0, Math.min(
      86.010 * Math.log10(waistInInches - neckInInches) - 
      70.041 * Math.log10(heightInInches) + 36.76,
      100
    ));
  } else {
    bodyFat = Math.max(0, Math.min(
      163.205 * Math.log10(waistInInches + hipInInches - neckInInches) - 
      97.684 * Math.log10(heightInInches) - 78.387,
      100
    ));
  }

  return bodyFat;
};