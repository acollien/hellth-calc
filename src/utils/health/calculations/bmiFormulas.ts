export const calculateStandardBMI = (height: number, weight: number): number | null => {
  console.log('Calculating standard BMI with height:', height, 'and weight:', weight);
  
  if (!height || !weight || height <= 0 || weight <= 0) {
    console.log('Invalid height or weight values for standard BMI');
    return null;
  }

  const heightInM = height / 100;
  return weight / (heightInM * heightInM);
};

export const calculateAthleticBMI = (standardBMI: number): number | null => {
  console.log('Calculating athletic BMI from standard BMI:', standardBMI);
  
  if (!standardBMI || standardBMI <= 0) {
    console.log('Invalid standard BMI for athletic calculation');
    return null;
  }

  return standardBMI * 0.9;
};

export const calculateDevineBMI = (height: number, weight: number): number | null => {
  console.log('Calculating Devine BMI with height:', height, 'and weight:', weight);
  
  if (!height || !weight || height <= 0 || weight <= 0) {
    console.log('Invalid height or weight values for Devine BMI');
    return null;
  }

  const devineIdealWeight = 45.5 + 2.3 * ((height / 2.54) - 60);
  return (weight / devineIdealWeight) * 21.7;
};

export const calculateBMIBasedRange = (standardBMI: number): number | null => {
  console.log('Calculating BMI-based range from standard BMI:', standardBMI);
  
  if (!standardBMI || standardBMI <= 0) {
    console.log('Invalid standard BMI for BMI-based range');
    return null;
  }

  return standardBMI;
};