import { HealthMetrics } from '../types';

export const calculateBMI = (height: number, weight: number) => {
  const heightInM = height / 100;
  const standardBMI = weight / (heightInM * heightInM);
  
  return {
    standard: standardBMI,
    devine: (weight / ((height / 2.54 - 60) * 2.3 + 45.5)) * 21.7,
    athletic: (standardBMI * 0.9),
    bmiBased: standardBMI // Adding BMI-based calculation
  };
};