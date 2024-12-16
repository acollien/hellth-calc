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