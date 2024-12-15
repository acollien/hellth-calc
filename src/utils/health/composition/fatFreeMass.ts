import { HealthMetrics } from '@/components/health/types';
import { calculateLeanBodyMass } from './leanMass';

export const calculateFatFreeMassIndex = (metrics: HealthMetrics): number | null => {
  console.log('Calculating fat-free mass index with metrics:', metrics);
  const lbm = calculateLeanBodyMass(metrics);
  if (!lbm || !metrics.height) return null;

  const heightInMeters = metrics.unit === 'metric' ? parseFloat(metrics.height) / 100 : parseFloat(metrics.height) * 0.0254;
  return lbm / (heightInMeters * heightInMeters);
};