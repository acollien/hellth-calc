import { HealthMetrics } from '../types';

export const calculateJacksonPollockBodyFat = (metrics: HealthMetrics): number | null => {
  console.log('Calculating Jackson-Pollock body fat with metrics:', metrics);
  
  if (!metrics.chest || !metrics.abdominal || !metrics.thigh || !metrics.age || !metrics.gender) {
    return null;
  }

  const sum = metrics.chest + metrics.abdominal + metrics.thigh;
  let bodyDensity: number;

  if (metrics.gender === 'male') {
    bodyDensity = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * metrics.age);
  } else {
    bodyDensity = 1.089733 - (0.0009245 * sum) + (0.0000025 * sum * sum) - (0.0000979 * metrics.age);
  }

  return (495 / bodyDensity) - 450;
};