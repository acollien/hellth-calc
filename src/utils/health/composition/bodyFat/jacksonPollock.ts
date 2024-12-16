import { HealthMetrics } from '@/components/health/types';

export const calculateJacksonPollockBodyFat = (metrics: HealthMetrics): number | null => {
  console.log('Calculating Jackson-Pollock body fat with metrics:', metrics);
  
  if (!metrics.chestSkinfold || !metrics.thighSkinfold || !metrics.suprailiacSkinfold || !metrics.age || !metrics.gender) {
    console.log('Missing required measurements for Jackson-Pollock calculation');
    return null;
  }

  const chest = Number(metrics.chestSkinfold);
  const thigh = Number(metrics.thighSkinfold);
  const suprailiac = Number(metrics.suprailiacSkinfold);
  const age = Number(metrics.age);

  if (isNaN(chest) || isNaN(thigh) || isNaN(suprailiac) || isNaN(age)) {
    console.log('Invalid number conversion in measurements');
    return null;
  }

  const sum = chest + thigh + suprailiac;
  console.log('Sum of skinfolds:', sum);

  let bodyDensity: number;
  if (metrics.gender === 'male') {
    // Male formula (Jackson & Pollock, 1978)
    bodyDensity = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * age);
  } else {
    // Female formula (Jackson, Pollock & Ward, 1980)
    bodyDensity = 1.0994921 - (0.0009929 * sum) + (0.0000023 * sum * sum) - (0.0001392 * age);
  }

  console.log('Calculated body density:', bodyDensity);

  // Siri's equation (1956) for converting body density to body fat percentage
  const bodyFat = (495 / bodyDensity) - 450;
  console.log('Calculated body fat percentage:', bodyFat);

  return isNaN(bodyFat) ? null : Math.max(0, Math.min(bodyFat, 100));
};