import { HealthMetrics } from '@/components/health/types';

export const calculateJacksonPollockBodyFat = (metrics: HealthMetrics): number | null => {
  console.log('Starting Jackson-Pollock calculation with metrics:', metrics);
  
  if (!metrics.chestSkinfold || !metrics.thighSkinfold || !metrics.suprailiacSkinfold || !metrics.age || !metrics.gender) {
    console.log('Missing required measurements for Jackson-Pollock calculation');
    return null;
  }

  // Convert skinfold measurements from mm to cm
  const chest = Number(metrics.chestSkinfold) / 10;
  const thigh = Number(metrics.thighSkinfold) / 10;
  const suprailiac = Number(metrics.suprailiacSkinfold) / 10;
  const age = Number(metrics.age);

  if (isNaN(chest) || isNaN(thigh) || isNaN(suprailiac) || isNaN(age)) {
    console.log('Invalid number conversion in measurements:', { chest, thigh, suprailiac, age });
    return null;
  }

  // Calculate sum of skinfolds (in cm)
  const sum = chest + thigh + suprailiac;
  console.log('Sum of skinfolds (cm):', sum);

  let bodyDensity: number;

  if (metrics.gender === 'male') {
    // Male formula (Jackson & Pollock, 1978)
    bodyDensity = 1.1093800 - (0.0008267 * sum * 10) + (0.0000016 * Math.pow(sum * 10, 2)) - (0.0002574 * age);
    console.log('Using male formula with coefficients: 1.1093800, -0.0008267, 0.0000016, -0.0002574');
  } else {
    // Female formula (Jackson, Pollock & Ward, 1980)
    bodyDensity = 1.099492 - (0.0009929 * sum * 10) + (0.0000023 * Math.pow(sum * 10, 2)) - (0.0001392 * age);
    console.log('Using female formula with coefficients: 1.099492, -0.0009929, 0.0000023, -0.0001392');
  }

  console.log('Calculated body density:', bodyDensity);

  // Siri's equation for converting body density to body fat percentage
  const bodyFat = (495 / bodyDensity) - 450;
  console.log('Final body fat percentage:', bodyFat);

  // Ensure the result is within reasonable bounds
  if (bodyFat < 5 || bodyFat > 50) {
    console.log('Calculated body fat percentage outside reasonable range:', bodyFat);
    return null;
  }

  return Math.round(bodyFat * 10) / 10; // Round to 1 decimal place
};