export interface HealthMetrics {
  height: string;
  weight: string;
  age: string;
  gender: 'male' | 'female' | '';
  neck: string;
  waist: string;
  hip: string;
  wrist: string;
  forearm: string;
  chestSkinfold: string;
  midaxillarySkinfold: string;
  suprailiacSkinfold: string;
  thighSkinfold: string;
  umbilicalSkinfold: string;
  tricepsSkinfold: string;
  midaxillarySkinfold2: string;
  subscapularSkinfold: string;
  calfSkinfold: string;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive' | '';
  unit: 'metric' | 'imperial';
}

export interface NumericHealthMetrics {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
  neck?: number;
  waist?: number;
  hip?: number;
  wrist?: number;
  forearm?: number;
  chestSkinfold?: number;
  midaxillarySkinfold?: number;
  suprailiacSkinfold?: number;
  thighSkinfold?: number;
  umbilicalSkinfold?: number;
  tricepsSkinfold?: number;
  midaxillarySkinfold2?: number;
  subscapularSkinfold?: number;
  calfSkinfold?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  unit: 'metric' | 'imperial';
}

export interface BodyFatResult {
  navy: number | null;
  jackson: number | null;
  bmiBased: number | null;
  army: number | null;
}

export interface HealthResult {
  bodyFat?: BodyFatResult;
  bmi?: {
    standard: number;
    devine: number;
    athletic: number;
    bmiBased: number;
  };
  bmr?: {
    bmr: number;
    tdee?: number;
  };
  idealWeight?: {
    robinson: number;
    miller: number;
    devine: number;
    athletic: number;
    bmiBased: number;
  };
  frameSize?: string;
  waistToHip?: number;
  biologicalAge?: number;
  ponderalIndex?: {
    metric: number;
    imperial: number;
  };
  absi?: {
    metric: number;
    imperial: number;
  };
  bodyRoundnessIndex?: {
    metric: number;
    imperial: number;
  };
  waistToHeightRatio?: number;
  leanBodyMass?: number;
  fatFreeMassIndex?: number;
  skeletalMuscleMass?: number;
  bodyFatDistribution?: number;
  leanMassIndex?: number;
  bodyAdiposityIndex?: number;
  conicityIndex?: number;
}