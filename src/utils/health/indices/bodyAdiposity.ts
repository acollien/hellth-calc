import { HealthMetrics } from '@/components/health/types';

export const calculateBodyAdiposityIndex = (metrics: HealthMetrics): number | null => {
  if (!metrics.hip || !metrics.height) {
    return null;
  }

  const hipInM = metrics.unit === 'imperial' ? 
    Number(metrics.hip) * 0.0254 : 
    Number(metrics.hip) / 100;
    
  const heightInM = metrics.unit === 'imperial' ? 
    Number(metrics.height) * 0.0254 : 
    Number(metrics.height) / 100;

  return (hipInM / Math.pow(heightInM, 1.5)) - 18;
};