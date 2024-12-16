import { HealthMetrics } from '@/components/health/types';
import { calculateLeanBodyMass } from './leanMass';

export const calculateFatFreeMassIndex = (metrics: HealthMetrics): number | null => {
  console.log('Calculating fat-free mass index with metrics:', metrics);
  const lbm = calculateLeanBodyMass(metrics);
  if (!lbm || !metrics.height) return null;

  // Convert height to meters for the calculation
  const heightInMeters = metrics.unit === 'metric' 
    ? parseFloat(metrics.height) / 100 
    : parseFloat(metrics.height) * 0.0254;

  // FFMI Formula: LBM/height² (VanItallie et al., 1990)
  const ffmi = lbm / (heightInMeters * heightInMeters);
  
  console.log('Calculated fat-free mass index:', ffmi);
  return Math.max(0, ffmi);
};