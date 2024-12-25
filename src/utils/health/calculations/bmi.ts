import {
  calculateStandardBMI,
  calculateAthleticBMI,
  calculateDevineBMI,
  calculateModifiedBMI
} from './bmiFormulas';

export const calculateBMI = (height: number, weight: number) => {
  console.log('Starting BMI calculations with height:', height, 'and weight:', weight);
  
  const standardBMI = calculateStandardBMI(height, weight);
  console.log('Standard BMI calculated:', standardBMI);

  if (!standardBMI) {
    console.log('Failed to calculate standard BMI, returning null results');
    return null;
  }

  const athleticBMI = calculateAthleticBMI(standardBMI);
  const devineBMI = calculateDevineBMI(height, weight);
  const modifiedBMI = calculateModifiedBMI(height, weight);

  const results = {
    standard: standardBMI,
    athletic: athleticBMI,
    devine: devineBMI,
    bmiBased: modifiedBMI
  };

  console.log('Final BMI calculation results:', results);
  return results;
};