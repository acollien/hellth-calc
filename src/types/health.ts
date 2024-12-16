export interface HealthResult {
  bmi?: {
    standard: number;
    devine: number;
    athletic: number;
    bmiBased: number;
  };
  bodyFat?: {
    navy: number | null;
    jackson: number | null;
    bmiBased: number | null;
    army: number | null;
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

export interface ResultsProps {
  results: HealthResult;
}