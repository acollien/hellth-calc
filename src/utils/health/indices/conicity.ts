import { HealthMetrics } from '@/components/health/types';

export const calculateConicityIndex = (metrics: HealthMetrics): number | null => {
  if (!metrics.waist || !metrics.weight || !metrics.height) {
    return null;
  }

  const waistInM = metrics.unit === 'imperial' ? 
    Number(metrics.waist) * 0.0254 : 
    Number(metrics.waist) / 100;
    
  const heightInM = metrics.unit === 'imperial' ? 
    Number(metrics.height) * 0.0254 : 
    Number(metrics.height) / 100;
    
  const weightInKg = metrics.unit === 'imperial' ? 
    Number(metrics.weight) * 0.453592 : 
    Number(metrics.weight);

  return waistInM / (0.109 * Math.sqrt(weightInKg / heightInM));
};