import { HealthMetrics } from '@/components/health/types';

export const calculateJacksonPollockBodyFat = (metrics: HealthMetrics): number | null => {
  if (!metrics.chestSkinfold || !metrics.thighSkinfold || !metrics.suprailiacSkinfold || !metrics.age || !metrics.gender) {
    return null;
  }

  const chest = Number(metrics.chestSkinfold);
  const thigh = Number(metrics.thighSkinfold);
  const suprailiac = Number(metrics.suprailiacSkinfold);
  const age = Number(metrics.age);

  const sum = chest + thigh + suprailiac;

  let bodyDensity: number;
  if (metrics.gender === 'male') {
    bodyDensity = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * age);
  } else {
    bodyDensity = 1.089733 - (0.0009245 * sum) + (0.0000025 * sum * sum) - (0.0000979 * age);
  }

  return (495 / bodyDensity) - 450;
};