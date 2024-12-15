import { HealthMetrics } from '@/components/health/types';

export const calculateFrameSize = (metrics: {
  height?: number;
  wrist?: number;
  gender?: string;
  unit?: 'metric' | 'imperial';
}): string | null => {
  console.log('Calculating frame size with metrics:', metrics);
  
  if (!metrics.height || !metrics.wrist) {
    console.log('Missing required measurements for frame size calculation');
    return null;
  }

  // Ensure measurements are in metric
  let height = metrics.height;
  let wrist = metrics.wrist;
  
  if (metrics.unit === 'imperial') {
    height = height * 2.54; // Convert inches to cm
    wrist = wrist * 2.54; // Convert inches to cm
  }

  // Calculate height to wrist ratio
  const ratio = height / wrist;
  console.log('Height to wrist ratio:', ratio);

  // Different ranges for males and females
  if (metrics.gender === 'female') {
    if (ratio > 11.0) return 'small';
    if (ratio < 10.1) return 'large';
    return 'medium';
  } else {
    // Default to male ranges
    if (ratio > 10.4) return 'small';
    if (ratio < 9.6) return 'large';
    return 'medium';
  }
};