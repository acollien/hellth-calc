import { HealthMetrics } from "@/components/health/types";

export const calculateBodyFat = (metrics: HealthMetrics) => {
  const results: { [key: string]: number | null } = {
    navy: null,
    jackson: null,
    bmiBased: null,
    army: null
  };

  if (metrics.neck && metrics.waist && metrics.hip && metrics.height && metrics.gender) {
    // Navy Method
    const neck = parseFloat(metrics.neck);
    const waist = parseFloat(metrics.waist);
    const hip = parseFloat(metrics.hip);
    const height = parseFloat(metrics.height);

    if (metrics.gender === 'male') {
      results.navy = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      results.navy = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
  }

  // BMI-based estimation
  if (metrics.height && metrics.weight && metrics.age && metrics.gender) {
    const height = parseFloat(metrics.height);
    const weight = parseFloat(metrics.weight);
    const age = parseFloat(metrics.age);
    const bmi = weight / Math.pow(height / 100, 2);
    
    if (metrics.gender === 'male') {
      results.bmiBased = (1.20 * bmi) + (0.23 * age) - 16.2;
    } else {
      results.bmiBased = (1.20 * bmi) + (0.23 * age) - 5.4;
    }
  }

  return results;
};

export const calculateIdealWeight = (height: number, gender: 'male' | 'female') => {
  const heightInInches = height / 2.54;
  
  return {
    robinson: gender === 'male'
      ? 52 + 1.9 * (heightInInches - 60)
      : 49 + 1.7 * (heightInInches - 60),
    miller: gender === 'male'
      ? 56.2 + 1.41 * (heightInInches - 60)
      : 53.1 + 1.36 * (heightInInches - 60),
    devine: gender === 'male'
      ? 50 + 2.3 * (heightInInches - 60)
      : 45.5 + 2.3 * (heightInInches - 60)
  };
};