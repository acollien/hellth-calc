import { HealthMetrics } from "@/components/health/types";

export const calculateBodyRoundnessIndex = (waist: number, height: number, unit: 'metric' | 'imperial') => {
  const waistInM = unit === 'imperial' ? (waist * 0.0254) : (waist / 100);
  const heightInM = unit === 'imperial' ? (height * 0.0254) : (height / 100);
  
  const bri = 364.2 - (365.5 * Math.sqrt(1 - ((Math.pow(waistInM / (2 * Math.PI), 2)) / (0.09 * Math.pow(heightInM, 2)))));
  
  return {
    metric: bri,
    imperial: bri // BRI is unitless
  };
};

export const calculateWaistToHeightRatio = (waist: number, height: number) => {
  return waist / height;
};

export const calculateBiologicalAge = (metrics: HealthMetrics) => {
  if (!metrics.age || !metrics.weight || !metrics.height) return null;

  const age = parseFloat(metrics.age);
  const weight = parseFloat(metrics.weight);
  const height = parseFloat(metrics.height);

  const bmi = weight / Math.pow(height / 100, 2);
  let bioAge = age;

  // Adjust for BMI
  if (bmi > 25) bioAge += (bmi - 25) * 0.5;
  if (bmi < 18.5) bioAge += (18.5 - bmi) * 0.5;

  // Adjust for waist-to-hip ratio if available
  if (metrics.waist && metrics.hip) {
    const waist = parseFloat(metrics.waist);
    const hip = parseFloat(metrics.hip);
    const whr = waist / hip;
    
    if (metrics.gender === 'male' && whr > 0.9) bioAge += (whr - 0.9) * 10;
    if (metrics.gender === 'female' && whr > 0.85) bioAge += (whr - 0.85) * 10;
  }

  return Math.round(bioAge);
};