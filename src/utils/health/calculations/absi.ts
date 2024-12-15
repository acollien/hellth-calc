export const calculateABSI = (waist: number, height: number, weight: number, unit: 'metric' | 'imperial') => {
  const waistInM = unit === 'imperial' ? (waist * 0.0254) : (waist / 100);
  const heightInM = unit === 'imperial' ? (height * 0.0254) : (height / 100);
  const weightInKg = unit === 'imperial' ? (weight * 0.453592) : weight;
  
  const bmi = weightInKg / (heightInM * heightInM);
  const absi = waistInM / (Math.pow(bmi, 2/3) * Math.pow(heightInM, 1/2));
  
  return {
    metric: absi,
    imperial: absi * 39.3701
  };
};