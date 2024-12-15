interface HealthMetrics {
  height: number;
  weight?: number;
  wrist?: number;
  waist?: number;
  hip?: number;
  unit?: 'metric' | 'imperial';
  age?: number;
  gender?: 'male' | 'female';
}

export const calculateFrameSize = (metrics: HealthMetrics) => {
  if (!metrics.height || !metrics.wrist) return null;

  const r = metrics.height / metrics.wrist;
  if (r > 10.4) return 'small';
  if (r < 9.6) return 'large';
  return 'medium';
};

export const calculateWaistToHip = (metrics: HealthMetrics) => {
  if (!metrics.waist || !metrics.hip) return null;
  return metrics.waist / metrics.hip;
};

export const calculateBiologicalAge = (metrics: HealthMetrics) => {
  if (!metrics.age || !metrics.weight || !metrics.height) return null;

  const bmi = metrics.weight / Math.pow(metrics.height / 100, 2);
  let bioAge = metrics.age;

  if (bmi > 25) bioAge += (bmi - 25) * 0.5;
  if (bmi < 18.5) bioAge += (18.5 - bmi) * 0.5;

  const whr = calculateWaistToHip(metrics);
  if (whr) {
    if (metrics.gender === 'male' && whr > 0.9) bioAge += (whr - 0.9) * 10;
    if (metrics.gender === 'female' && whr > 0.85) bioAge += (whr - 0.85) * 10;
  }

  return Math.round(bioAge);
};