interface HealthMetrics {
  // Basic measurements
  height: number;
  weight: number;
  age?: number;
  gender?: 'male' | 'female';
  
  // Body measurements
  neck?: number;
  waist?: number;
  hip?: number;
  wrist?: number;
  forearm?: number;
  
  // Skinfold measurements (in mm)
  triceps?: number;
  subscapular?: number;
  suprailiac?: number;
  abdominal?: number;
  thigh?: number;
  chest?: number;
  
  // Activity level
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
}

export const calculateBMI = (height: number, weight: number) => {
  const heightInM = height / 100;
  return {
    standard: weight / (heightInM * heightInM),
    devine: (weight / ((height / 2.54 - 60) * 2.3 + 45.5)) * 21.7,
    athletic: (weight / (heightInM * heightInM)) * 0.9
  };
};

export const calculateBodyFat = (metrics: HealthMetrics) => {
  const results: { [key: string]: number | null } = {
    navy: null,
    jackson: null,
    bmiBased: null
  };

  // Navy Method
  if (metrics.neck && metrics.waist && metrics.hip && metrics.height && metrics.gender) {
    if (metrics.gender === 'male') {
      results.navy = 495 / (1.0324 - 0.19077 * Math.log10(metrics.waist - metrics.neck) + 0.15456 * Math.log10(metrics.height)) - 450;
    } else {
      results.navy = 495 / (1.29579 - 0.35004 * Math.log10(metrics.waist + metrics.hip - metrics.neck) + 0.22100 * Math.log10(metrics.height)) - 450;
    }
  }

  // Jackson-Pollock Method
  if (metrics.chest && metrics.abdominal && metrics.thigh && metrics.age && metrics.gender) {
    const sum = metrics.chest + metrics.abdominal + metrics.thigh;
    if (metrics.gender === 'male') {
      results.jackson = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * metrics.age);
      results.jackson = (495 / results.jackson) - 450;
    } else {
      results.jackson = 1.089733 - (0.0009245 * sum) + (0.0000025 * sum * sum) - (0.0000979 * metrics.age);
      results.jackson = (495 / results.jackson) - 450;
    }
  }

  // BMI-based estimation
  if (metrics.height && metrics.weight && metrics.age && metrics.gender) {
    const bmi = metrics.weight / Math.pow(metrics.height / 100, 2);
    if (metrics.gender === 'male') {
      results.bmiBased = (1.20 * bmi) + (0.23 * metrics.age) - 16.2;
    } else {
      results.bmiBased = (1.20 * bmi) + (0.23 * metrics.age) - 5.4;
    }
  }

  return results;
};

export const calculateBMR = (metrics: HealthMetrics) => {
  if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) return null;

  // Mifflin-St Jeor Equation
  const bmr = metrics.gender === 'male'
    ? (10 * metrics.weight) + (6.25 * metrics.height) - (5 * metrics.age) + 5
    : (10 * metrics.weight) + (6.25 * metrics.height) - (5 * metrics.age) - 161;

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const tdee = metrics.activityLevel 
    ? bmr * activityMultipliers[metrics.activityLevel]
    : null;

  return { bmr, tdee };
};

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

export const calculateIdealWeight = (height: number, gender: 'male' | 'female') => {
  const heightInInches = height / 2.54;
  
  // Robinson formula
  const robinson = gender === 'male'
    ? 52 + 1.9 * (heightInInches - 60)
    : 49 + 1.7 * (heightInInches - 60);

  // Miller formula
  const miller = gender === 'male'
    ? 56.2 + 1.41 * (heightInInches - 60)
    : 53.1 + 1.36 * (heightInInches - 60);

  // Devine formula
  const devine = gender === 'male'
    ? 50 + 2.3 * (heightInInches - 60)
    : 45.5 + 2.3 * (heightInInches - 60);

  return { robinson, miller, devine };
};

export const calculateBiologicalAge = (metrics: HealthMetrics) => {
  if (!metrics.age || !metrics.weight || !metrics.height) return null;

  const bmi = metrics.weight / Math.pow(metrics.height / 100, 2);
  let bioAge = metrics.age;

  // Adjust for BMI
  if (bmi > 25) bioAge += (bmi - 25) * 0.5;
  if (bmi < 18.5) bioAge += (18.5 - bmi) * 0.5;

  // Adjust for waist-to-hip ratio if available
  const whr = calculateWaistToHip(metrics);
  if (whr) {
    if (metrics.gender === 'male' && whr > 0.9) bioAge += (whr - 0.9) * 10;
    if (metrics.gender === 'female' && whr > 0.85) bioAge += (whr - 0.85) * 10;
  }

  return Math.round(bioAge);
};