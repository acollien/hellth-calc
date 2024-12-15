import { HealthMetrics } from './types';

export const convertToMetric = (metrics: HealthMetrics): HealthMetrics => {
  if (metrics.unit !== 'imperial') return metrics;

  const converted: HealthMetrics = { ...metrics };
  
  if (metrics.height) converted.height = metrics.height * 2.54;
  if (metrics.weight) converted.weight = metrics.weight * 0.453592;
  if (metrics.neck) converted.neck = metrics.neck * 2.54;
  if (metrics.waist) converted.waist = metrics.waist * 2.54;
  if (metrics.hip) converted.hip = metrics.hip * 2.54;
  if (metrics.wrist) converted.wrist = metrics.wrist * 2.54;
  if (metrics.forearm) converted.forearm = metrics.forearm * 2.54;

  console.log('Converted metrics to metric:', converted);
  return converted;
};

export const convertToImperial = (value: number): number => {
  return value * 0.393701; // cm to inches
};