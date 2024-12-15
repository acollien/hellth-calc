import { HealthMetrics } from '@/components/health/types';

export const calculateFrameSize = (metrics: HealthMetrics): 'small' | 'medium' | 'large' | null => {
  if (!metrics.wrist || !metrics.height) {
    return null;
  }

  const wristInCm = Number(metrics.unit === 'imperial' ? Number(metrics.wrist) * 2.54 : metrics.wrist);
  const heightInCm = Number(metrics.unit === 'imperial' ? Number(metrics.height) * 2.54 : metrics.height);

  const r = heightInCm / wristInCm;

  if (metrics.gender === 'male') {
    if (r > 10.4) return 'small';
    if (r < 9.6) return 'large';
    return 'medium';
  } else {
    if (r > 11.0) return 'small';
    if (r < 10.1) return 'large';
    return 'medium';
  }
};