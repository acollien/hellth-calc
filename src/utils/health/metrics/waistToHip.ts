import { HealthMetrics } from '@/components/health/types';

export const calculateWaistToHipRatio = (metrics: HealthMetrics): number | null => {
  console.log('Calculating waist-to-hip ratio with metrics:', metrics);
  if (!metrics.waist || !metrics.hip) return null;

  const waist = parseFloat(metrics.waist);
  const hip = parseFloat(metrics.hip);

  return waist / hip;
};