export interface BaseHealthMetrics {
  height: number;
  weight: number;
  age?: number;
  gender: 'male' | 'female';
  unit: 'metric' | 'imperial';
}

export interface BodyMeasurements {
  neck?: number;
  waist?: number;
  hip?: number;
  wrist?: number;
  forearm?: number;
}

export interface SkinfoldMeasurements {
  triceps?: number;
  subscapular?: number;
  suprailiac?: number;
  abdominal?: number;
  thigh?: number;
  chest?: number;
  chestSkinfold?: number;
  thighSkinfold?: number;
  suprailiacSkinfold?: number;
}

export interface ActivityLevel {
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
}

export type HealthMetrics = BaseHealthMetrics & BodyMeasurements & SkinfoldMeasurements & Partial<ActivityLevel>;

export interface BMIResult {
  standard: number;
  athletic: number;
  devine: number;
  bmiBased: number;
}

export interface BodyFatResult {
  navy: number | null;
  jackson: number | null;
  bmiBased: number | null;
  army: number | null;
}

export interface IdealWeightResult {
  robinson: number;
  miller: number;
  devine: number;
  athletic: number;
  bmiBased: number;
}

export interface HealthResult {
  bmi?: BMIResult;
  bodyFat?: BodyFatResult;
  bmr?: {
    bmr: number;
    tdee?: number;
  };
  idealWeight?: IdealWeightResult;
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
  gender?: 'male' | 'female';
}