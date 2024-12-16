import { HealthMetrics } from '@/components/health/types';

export const calculateJacksonPollockBodyFat = (metrics: HealthMetrics): number | null => {
  console.log('Starting Jackson-Pollock calculation with metrics:', metrics);
  
  // Check if we have all required measurements
  if (!metrics.chestSkinfold || !metrics.thighSkinfold || !metrics.suprailiacSkinfold || !metrics.age || !metrics.gender) {
    console.log('Missing required measurements for Jackson-Pollock calculation');
    return null;
  }

  // Convert skinfold measurements to numbers
  const chest = Number(metrics.chestSkinfold);
  const thigh = Number(metrics.thighSkinfold);
  const suprailiac = Number(metrics.suprailiacSkinfold);
  const age = Number(metrics.age);

  // Validate converted numbers
  if (isNaN(chest) || isNaN(thigh) || isNaN(suprailiac) || isNaN(age)) {
    console.log('Invalid number conversion in measurements:', { chest, thigh, suprailiac, age });
    return null;
  }

  // Calculate sum of skinfolds
  const sum = chest + thigh + suprailiac;
  console.log('Sum of skinfolds:', sum);

  let bodyDensity: number;

  // Updated coefficients based on original Jackson & Pollock research papers
  if (metrics.gender === 'male') {
    // Male formula (Jackson & Pollock, 1978)
    bodyDensity = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * age);
    console.log('Using male formula with coefficients: 1.10938, -0.0008267, 0.0000016, -0.0002574');
  } else {
    // Female formula (Jackson, Pollock & Ward, 1980)
    bodyDensity = 1.0994921 - (0.0009929 * sum) + (0.0000023 * sum * sum) - (0.0001392 * age);
    console.log('Using female formula with coefficients: 1.0994921, -0.0009929, 0.0000023, -0.0001392');
  }

  console.log('Calculated body density:', bodyDensity);

  // Siri's equation (1956) for converting body density to body fat percentage
  const bodyFat = (495 / bodyDensity) - 450;
  console.log('Final body fat percentage:', bodyFat);

  // Ensure the result is within reasonable bounds (1-60%)
  if (bodyFat < 1 || bodyFat > 60) {
    console.log('Calculated body fat percentage outside reasonable range:', bodyFat);
    return null;
  }

  return Math.round(bodyFat * 100) / 100; // Round to 2 decimal places
};