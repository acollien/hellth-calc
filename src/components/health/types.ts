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
  chestSkinfold: string;      // Point a
  midaxillarySkinfold: string; // Point b
  suprailiacSkinfold: string;  // Point c
  thighSkinfold: string;       // Point d
  umbilicalSkinfold: string;   // Point e
  tricepsSkinfold: string;     // Point f
  subscapularSkinfold: string; // Point h
  calfSkinfold: string;        // Point i
  midaxillarySkinfold2: string; // Point g
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive' | '';
  unit: 'metric' | 'imperial';
}