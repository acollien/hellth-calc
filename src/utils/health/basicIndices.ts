import { BMIResult, MetricImperialResult } from './types';
import { convertToMetric } from './conversions';

export const calculateBMI = (height: number, weight: number): BMIResult => {
  console.log('Calculating BMI with height:', height, 'weight:', weight);
  const heightInM = height / 100;
  return {
    standard: weight / (heightInM * heightInM),
    devine: (weight / ((height / 2.54 - 60) * 2.3 + 45.5)) * 21.7,
    athletic: (weight / (heightInM * heightInM)) * 0.9
  };
};

export const calculatePonderalIndex = (height: number, weight: number, unit: 'metric' | 'imperial'): MetricImperialResult => {
  console.log('Calculating Ponderal Index with height:', height, 'weight:', weight, 'unit:', unit);
  const heightInM = unit === 'imperial' ? (height * 0.0254) : (height / 100);
  const weightInKg = unit === 'imperial' ? (weight * 0.453592) : weight;
  
  return {
    metric: weightInKg / Math.pow(heightInM, 3),
    imperial: (weightInKg * 2.20462) / Math.pow(heightInM * 39.3701, 3)
  };
};

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

export const calculateBodyRoundnessIndex = (waist: number, height: number, unit: 'metric' | 'imperial') => {
  const waistInM = unit === 'imperial' ? (waist * 0.0254) : (waist / 100);
  const heightInM = unit === 'imperial' ? (height * 0.0254) : (height / 100);
  
  const bri = 364.2 - (365.5 * Math.sqrt(1 - ((Math.pow(waistInM / (2 * Math.PI), 2)) / (0.09 * Math.pow(heightInM, 2)))));
  
  return {
    metric: bri,
    imperial: bri
  };
};

export const calculateWaistToHeightRatio = (waist: number, height: number) => {
  return waist / height;
};