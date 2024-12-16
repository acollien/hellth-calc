import { HealthMetrics } from '@/components/health/types';

export const calculateArmyBodyFat = (metrics: HealthMetrics): number | null => {
  if (!metrics.gender || !metrics.neck || !metrics.waist || !metrics.height || 
      (metrics.gender === 'female' && !metrics.hip)) {
    return null;
  }

  const heightInInches = metrics.unit === 'metric' ? parseFloat(metrics.height) / 2.54 : parseFloat(metrics.height);
  const neckInInches = metrics.unit === 'metric' ? parseFloat(metrics.neck) / 2.54 : parseFloat(metrics.neck);
  const waistInInches = metrics.unit === 'metric' ? parseFloat(metrics.waist) / 2.54 : parseFloat(metrics.waist);
  const hipInInches = metrics.gender === 'female' ? 
    (metrics.unit === 'metric' ? parseFloat(metrics.hip) / 2.54 : parseFloat(metrics.hip)) : 0;

  let bodyFat: number;
  
  if (metrics.gender === 'male') {
    bodyFat = 86.010 * Math.log10(waistInInches - neckInInches) - 
              70.041 * Math.log10(heightInInches) + 36.76;
  } else {
    bodyFat = 163.205 * Math.log10(waistInInches + hipInInches - neckInInches) - 
              97.684 * Math.log10(heightInInches) - 78.387;
  }

  return Math.max(0, Math.min(bodyFat, 100));
};