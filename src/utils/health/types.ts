export interface BaseHealthMetrics {
  height: string;
  weight: string;
  age?: string;
  gender: 'male' | 'female';
  unit: 'metric' | 'imperial';
}

export interface BodyMeasurements {
  neck?: string;
  waist?: string;
  hip?: string;
  wrist?: string;
  forearm?: string;
}

export interface SkinfoldMeasurements {
  triceps?: string;
  subscapular?: string;
  suprailiac?: string;
  abdominal?: string;
  thigh?: string;
  chest?: string;
  chestSkinfold?: string;
  thighSkinfold?: string;
  suprailiacSkinfold?: string;
}

export interface ActivityLevel {
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive' | '';
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

export interface IndicesResults {
  absi: { metric: number; imperial: number };
  bodyRoundnessIndex: { metric: number; imperial: number };
  ponderalIndex: { metric: number; imperial: number };
  bodyAdiposityIndex: number;
  conicityIndex: number;
  waistToHeightRatio?: number;
  waistToHip?: number;
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
  waistToHeightRatio?: number;
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
  leanBodyMass?: number;
  fatFreeMassIndex?: number;
  skeletalMuscleMass?: number;
  bodyFatDistribution?: number;
  leanMassIndex?: number;
  bodyAdiposityIndex?: number;
  conicityIndex?: number;
  gender?: 'male' | 'female';
}