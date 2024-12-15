interface HealthMetrics {
  height: number;
  weight?: number;
  hip?: number;
  waist?: number;
  unit?: 'metric' | 'imperial';
}

export const calculateLeanMassIndex = (metrics: HealthMetrics) => {
  if (!metrics.weight || !metrics.height) return null;
  
  // Convert imperial to metric if needed
  const weight = metrics.unit === 'imperial' ? metrics.weight * 0.453592 : metrics.weight;
  const height = metrics.unit === 'imperial' ? metrics.height * 2.54 : metrics.height;
  
  // LMI = weight / (height^2) * (1 - body fat percentage)
  const heightInM = height / 100;
  return weight / (heightInM * heightInM);
};

export const calculateBodyAdiposityIndex = (metrics: HealthMetrics) => {
  if (!metrics.hip || !metrics.height) return null;
  
  // Convert imperial to metric if needed
  const hip = metrics.unit === 'imperial' ? metrics.hip * 2.54 : metrics.hip;
  const height = metrics.unit === 'imperial' ? metrics.height * 2.54 : metrics.height;
  
  // BAI = (hip circumference / height^1.5) - 18
  const heightInM = height / 100;
  return (hip / Math.pow(heightInM, 1.5)) - 18;
};

export const calculateConicityIndex = (metrics: HealthMetrics) => {
  if (!metrics.waist || !metrics.weight || !metrics.height) return null;
  
  // Convert imperial to metric if needed
  const waist = metrics.unit === 'imperial' ? metrics.waist * 2.54 : metrics.waist;
  const weight = metrics.unit === 'imperial' ? metrics.weight * 0.453592 : metrics.weight;
  const height = metrics.unit === 'imperial' ? metrics.height * 2.54 : metrics.height;
  
  // C-Index = waist / (0.109 * sqrt(weight/height))
  const waistInM = waist / 100;
  const heightInM = height / 100;
  return waistInM / (0.109 * Math.sqrt(weight / heightInM));
};