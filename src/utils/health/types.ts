export interface BaseHealthMetrics {
  height: number;
  weight: number;
  age?: number;
  gender?: 'male' | 'female';
  unit?: 'metric' | 'imperial';
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
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
}

export type HealthMetrics = BaseHealthMetrics & BodyMeasurements & SkinfoldMeasurements & ActivityLevel;

export interface BMIResult {
  standard: number;
  devine: number;
  athletic: number;
}

export interface BodyFatResult {
  navy: number | null;
  jackson: number | null;
  bmiBased: number | null;
  army: number | null;
}

export interface MetricImperialResult {
  metric: number;
  imperial: number;
}