import { HealthMetrics } from '@/components/health/types';

export const calculateArmyBodyFat = (metrics: HealthMetrics): number | null => {
  console.log('Army method calculating with metrics:', {
    neck: metrics.neck,
    waist: metrics.waist,
    hip: metrics.hip,
    height: metrics.height,
    gender: metrics.gender
  });

  if (!metrics.gender || !metrics.neck || !metrics.waist || !metrics.height || 
      (metrics.gender === 'female' && !metrics.hip)) {
    console.log('Army method missing required measurements');
    return null;
  }

  // Convert all measurements to inches if in metric
  const heightInInches = metrics.unit === 'metric' ? Number(metrics.height) / 2.54 : Number(metrics.height);
  const neckInInches = metrics.unit === 'metric' ? Number(metrics.neck) / 2.54 : Number(metrics.neck);
  const waistInInches = metrics.unit === 'metric' ? Number(metrics.waist) / 2.54 : Number(metrics.waist);
  const hipInInches = metrics.gender === 'female' && metrics.hip ? 
    (metrics.unit === 'metric' ? Number(metrics.hip) / 2.54 : Number(metrics.hip)) : 0;

  console.log('Army method converted measurements:', {
    heightInInches,
    neckInInches,
    waistInInches,
    hipInInches
  });

  let bodyFat: number;
  
  if (metrics.gender === 'male') {
    bodyFat = 86.010 * Math.log10(waistInInches - neckInInches) - 
              70.041 * Math.log10(heightInInches) + 36.76;
  } else {
    bodyFat = 163.205 * Math.log10(waistInInches + hipInInches - neckInInches) - 
              97.684 * Math.log10(heightInInches) - 78.387;
  }

  console.log('Army method calculated body fat:', bodyFat);

  // Ensure result is within realistic bounds
  if (isNaN(bodyFat) || bodyFat < 2 || bodyFat > 60) {
    console.log('Army method calculation produced invalid result:', bodyFat);
    return null;
  }

  return Math.round(bodyFat * 10) / 10; // Round to 1 decimal place
};