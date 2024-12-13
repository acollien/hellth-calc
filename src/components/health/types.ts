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
  triceps: string;
  subscapular: string;
  suprailiac: string;
  abdominal: string;
  thigh: string;
  chest: string;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive' | '';
  unit: 'metric' | 'imperial';
}