import { HealthMetrics } from '../types';

export const calculateBMI = (height: number, weight: number) => {
  console.log('Calculating BMI with height:', height, 'and weight:', weight);
  
  const heightInM = height / 100;
  const standardBMI = weight / (heightInM * heightInM);
  
  const athleticBMI = standardBMI * 0.9;
  const devineBMI = (weight / ((height / 2.54 - 60) * 2.3 + 45.5)) * 21.7;
  const bmiBasedBMI = standardBMI;

  console.log('Calculated BMI values:', {
    standard: standardBMI,
    athletic: athleticBMI,
    devine: devineBMI,
    bmiBased: bmiBasedBMI
  });

  return {
    standard: standardBMI,
    athletic: athleticBMI,
    devine: devineBMI,
    bmiBased: bmiBasedBMI
  };
};