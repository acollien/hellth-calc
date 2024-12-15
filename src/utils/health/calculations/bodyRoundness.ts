export const calculateBodyRoundnessIndex = (waist: number, height: number, unit: 'metric' | 'imperial') => {
  const waistInM = unit === 'imperial' ? (waist * 0.0254) : (waist / 100);
  const heightInM = unit === 'imperial' ? (height * 0.0254) : (height / 100);
  
  const bri = 364.2 - (365.5 * Math.sqrt(1 - ((Math.pow(waistInM / (2 * Math.PI), 2)) / (0.09 * Math.pow(heightInM, 2)))));
  
  return {
    metric: bri,
    imperial: bri
  };
};