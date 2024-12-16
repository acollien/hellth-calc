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
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
}

export type HealthMetrics = BaseHealthMetrics & BodyMeasurements & SkinfoldMeasurements & Partial<ActivityLevel>;

export interface BMIResult {
  standard: number;
  devine: number;
  athletic: number;
  bmiBased: number;
}

export interface BodyFatResult {
  navy: number | null;
  jackson: number | null;
  bmiBased: number | null;
  army: number | null;
}

export interface BMRResult {
  bmr: number;
  tdee?: number;
}

export interface IdealWeightResult {
  robinson: number;
  miller: number;
  devine: number;
  athletic: number;
  bmiBased: number;
}

export interface MetricImperialResult {
  metric: number;
  imperial: number;
}

export interface HealthResult {
  bmi?: BMIResult;
  bodyFat?: BodyFatResult;
  bmr?: BMRResult;
  idealWeight?: IdealWeightResult;
  frameSize?: 'small' | 'medium' | 'large' | null;
  waistToHip?: number;
  biologicalAge?: number;
  ponderalIndex?: MetricImperialResult;
  absi?: MetricImperialResult;
  bodyRoundnessIndex?: MetricImperialResult;
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
