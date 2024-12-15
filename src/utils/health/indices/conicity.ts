import { HealthMetrics } from '@/components/health/types';

export const calculateConicityIndex = (metrics: HealthMetrics): number | null => {
  if (!metrics.waist || !metrics.weight || !metrics.height) {
    return null;
  }

  const waistInM = Number(metrics.unit === 'imperial' ? Number(metrics.waist) * 0.0254 : metrics.waist / 100);
  const heightInM = Number(metrics.unit === 'imperial' ? Number(metrics.height) * 0.0254 : metrics.height / 100);
  const weightInKg = Number(metrics.unit === 'imperial' ? Number(metrics.weight) * 0.453592 : metrics.weight);

  return waistInM / (0.109 * Math.sqrt(weightInKg / heightInM));
};