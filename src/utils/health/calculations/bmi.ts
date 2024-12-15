import { HealthMetrics } from '../types';

export const calculateBMI = (height: number, weight: number) => {
  const heightInM = height / 100;
  return {
    standard: weight / (heightInM * heightInM),
    devine: (weight / ((height / 2.54 - 60) * 2.3 + 45.5)) * 21.7,
    athletic: (weight / (heightInM * heightInM)) * 0.9
  };
};