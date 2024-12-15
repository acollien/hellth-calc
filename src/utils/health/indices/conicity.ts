import { HealthMetrics } from '@/components/health/types';

export const calculateConicityIndex = (metrics: HealthMetrics): number | null => {
  if (!metrics.waist || !metrics.weight || !metrics.height) {
    return null;
  }

  const waistInM = metrics.unit === 'imperial' ? metrics.waist * 0.0254 : metrics.waist / 100;
  const heightInM = metrics.unit === 'imperial' ? metrics.height * 0.0254 : metrics.height / 100;
  const weightInKg = metrics.unit === 'imperial' ? metrics.weight * 0.453592 : metrics.weight;

  return waistInM / (0.109 * Math.sqrt(weightInKg / heightInM));
};