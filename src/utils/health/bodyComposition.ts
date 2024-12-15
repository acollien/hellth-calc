interface HealthMetrics {
  height: number;
  weight: number;
  age?: number;
  gender?: 'male' | 'female';
  neck?: number;
  waist?: number;
  hip?: number;
  wrist?: number;
  forearm?: number;
  unit?: 'metric' | 'imperial';
}

export const calculateBodyFat = (metrics: HealthMetrics) => {
  const results: { [key: string]: number | null } = {
    navy: null,
    jackson: null,
    bmiBased: null,
    army: null
  };

  if (metrics.neck && metrics.waist && metrics.hip && metrics.height && metrics.gender) {
    if (metrics.gender === 'male') {
      results.navy = 495 / (1.0324 - 0.19077 * Math.log10(metrics.waist - metrics.neck) + 0.15456 * Math.log10(metrics.height)) - 450;
    } else {
      results.navy = 495 / (1.29579 - 0.35004 * Math.log10(metrics.waist + metrics.hip - metrics.neck) + 0.22100 * Math.log10(metrics.height)) - 450;
    }
  }

  // BMI-based estimation
  if (metrics.height && metrics.weight && metrics.age && metrics.gender) {
    const bmi = metrics.weight / Math.pow(metrics.height / 100, 2);
    results.bmiBased = metrics.gender === 'male'
      ? (1.20 * bmi) + (0.23 * metrics.age) - 16.2
      : (1.20 * bmi) + (0.23 * metrics.age) - 5.4;
  }

  return results;
};

// New Group 2 calculations
export const calculateLeanBodyMass = (metrics: HealthMetrics) => {
  if (!metrics.weight || !metrics.height || !metrics.gender) return null;

  const heightInCm = metrics.unit === 'imperial' ? metrics.height * 2.54 : metrics.height;
  const weightInKg = metrics.unit === 'imperial' ? metrics.weight * 0.453592 : metrics.weight;

  // Boer Formula
  if (metrics.gender === 'male') {
    return (0.407 * weightInKg) + (0.267 * heightInCm) - 19.2;
  } else {
    return (0.252 * weightInKg) + (0.473 * heightInCm) - 48.3;
  }
};

export const calculateFatFreeMassIndex = (metrics: HealthMetrics) => {
  const lbm = calculateLeanBodyMass(metrics);
  if (!lbm || !metrics.height) return null;

  const heightInM = metrics.unit === 'imperial' ? metrics.height * 0.0254 : metrics.height / 100;
  return lbm / (heightInM * heightInM);
};

export const calculateSkeletalMuscleMass = (metrics: HealthMetrics) => {
  if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) return null;

  const heightInCm = metrics.unit === 'imperial' ? metrics.height * 2.54 : metrics.height;
  const weightInKg = metrics.unit === 'imperial' ? metrics.weight * 0.453592 : metrics.weight;

  // Lee Formula
  const smm = (0.244 * weightInKg) + (0.117 * heightInCm) - (0.127 * (metrics.age || 0)) + 
              (metrics.gender === 'male' ? 2.29 : 0) - 2.98;
  
  return smm;
};

export const calculateBodyFatDistributionIndex = (metrics: HealthMetrics) => {
  if (!metrics.waist || !metrics.hip || !metrics.height) return null;

  const waistInCm = metrics.unit === 'imperial' ? metrics.waist * 2.54 : metrics.waist;
  const hipInCm = metrics.unit === 'imperial' ? metrics.hip * 2.54 : metrics.hip;
  const heightInCm = metrics.unit === 'imperial' ? metrics.height * 2.54 : metrics.height;

  return (waistInCm * waistInCm) / (hipInCm * heightInCm);
};