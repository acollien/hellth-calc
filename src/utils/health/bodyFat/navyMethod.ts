import { HealthMetrics } from '@/components/health/types';

export const calculateNavyBodyFat = (metrics: HealthMetrics): number | null => {
  console.log('Navy method calculating with metrics:', {
    neck: metrics.neck,
    waist: metrics.waist,
    hip: metrics.hip,
    height: metrics.height,
    gender: metrics.gender
  });

  if (!metrics.neck || !metrics.waist || !metrics.hip || !metrics.height || !metrics.gender) {
    console.log('Navy method missing required measurements');
    return null;
  }

  // Convert all measurements to centimeters if in imperial
  const height = metrics.unit === 'imperial' ? Number(metrics.height) * 2.54 : Number(metrics.height);
  const neck = metrics.unit === 'imperial' ? Number(metrics.neck) * 2.54 : Number(metrics.neck);
  const waist = metrics.unit === 'imperial' ? Number(metrics.waist) * 2.54 : Number(metrics.waist);
  const hip = metrics.unit === 'imperial' ? Number(metrics.hip) * 2.54 : Number(metrics.hip);

  console.log('Navy method converted measurements:', { height, neck, waist, hip });
  
  let bodyFat: number;
  
  if (metrics.gender === 'male') {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }

  console.log('Navy method calculated body fat:', bodyFat);

  // Ensure result is within realistic bounds
  if (isNaN(bodyFat) || bodyFat < 2 || bodyFat > 60) {
    console.log('Navy method calculation produced invalid result:', bodyFat);
    return null;
  }

  return Math.round(bodyFat * 10) / 10; // Round to 1 decimal place
};