import { HealthMetrics } from '../types';

export const calculateBMI = (height: number, weight: number) => {
  console.log('Calculating BMI with height:', height, 'and weight:', weight);
  
  if (!height || !weight || height <= 0 || weight <= 0) {
    console.log('Invalid height or weight values');
    return null;
  }

  const heightInM = height / 100;
  const standardBMI = weight / (heightInM * heightInM);
  
  // Athletic BMI calculation
  const athleticBMI = standardBMI * 0.9;

  // Devine Formula BMI calculation
  const devineIdealWeight = 45.5 + 2.3 * ((height / 2.54) - 60);
  const devineBMI = (weight / devineIdealWeight) * 21.7;

  // BMI Based calculation
  const bmiBased = standardBMI;

  const results = {
    standard: standardBMI,
    athletic: athleticBMI,
    devine: devineBMI,
    bmiBased: bmiBased
  };

  console.log('BMI calculation results:', results);
  return results;
};