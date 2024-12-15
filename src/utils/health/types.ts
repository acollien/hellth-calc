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
  chestSkinfold?: number;      // Added
  thighSkinfold?: number;      // Added
  suprailiacSkinfold?: number; // Added
}

export interface ActivityLevel {
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
}

export type HealthMetrics = BaseHealthMetrics & BodyMeasurements & SkinfoldMeasurements & ActivityLevel;