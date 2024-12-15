import { HealthMetrics } from '../types';

export const calculateJacksonPollockBodyFat = (metrics: HealthMetrics): number | null => {
  console.log('Calculating Jackson-Pollock body fat with metrics:', metrics);
  
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
    console.log('Invalid number conversion in measurements');
    return null;
  }

  // Calculate sum of skinfolds
  const sum = chest + thigh + suprailiac;
  console.log('Sum of skinfolds:', sum);

  let bodyDensity: number;

  if (metrics.gender === 'male') {
    bodyDensity = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * age);
  } else {
    bodyDensity = 1.089733 - (0.0009245 * sum) + (0.0000025 * sum * sum) - (0.0000979 * age);
  }

  console.log('Calculated body density:', bodyDensity);

  // Calculate body fat percentage using Siri's equation
  const bodyFat = (495 / bodyDensity) - 450;
  console.log('Calculated body fat percentage:', bodyFat);

  return isNaN(bodyFat) ? null : bodyFat;
};