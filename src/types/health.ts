export interface IndicesResults {
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
  bodyAdiposityIndex?: number;
  conicityIndex?: number;
  waistToHip?: number;
  waistToHeightRatio?: number;
}

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
  midaxillarySkinfold2: string; // Point g
  subscapularSkinfold: string; // Point h
  calfSkinfold: string;        // Point i
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive' | '';
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
