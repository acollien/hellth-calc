export const calculatePonderalIndex = (height: number, weight: number, unit: 'metric' | 'imperial') => {
  const heightInM = unit === 'imperial' ? (height * 0.0254) : (height / 100);
  const weightInKg = unit === 'imperial' ? (weight * 0.453592) : weight;
  
  return {
    metric: weightInKg / Math.pow(heightInM, 3),
    imperial: (weightInKg * 2.20462) / Math.pow(heightInM * 39.3701, 3)
  };
};