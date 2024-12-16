import { HealthMetrics } from './types';

export const convertToMetric = (metrics: HealthMetrics): HealthMetrics => {
  if (metrics.unit === 'metric') return metrics;

  return {
    ...metrics,
    height: Number(metrics.height) * 2.54,
    weight: Number(metrics.weight) * 0.453592,
    neck: metrics.neck ? Number(metrics.neck) * 2.54 : undefined,
    waist: metrics.waist ? Number(metrics.waist) * 2.54 : undefined,
    hip: metrics.hip ? Number(metrics.hip) * 2.54 : undefined,
    wrist: metrics.wrist ? Number(metrics.wrist) * 2.54 : undefined,
    forearm: metrics.forearm ? Number(metrics.forearm) * 2.54 : undefined,
    unit: 'metric'
  };
};

export const convertToImperial = (metrics: HealthMetrics): HealthMetrics => {
  if (metrics.unit === 'imperial') return metrics;

  return {
    ...metrics,
    height: Number(metrics.height) / 2.54,
    weight: Number(metrics.weight) / 0.453592,
    neck: metrics.neck ? Number(metrics.neck) / 2.54 : undefined,
    waist: metrics.waist ? Number(metrics.waist) / 2.54 : undefined,
    hip: metrics.hip ? Number(metrics.hip) / 2.54 : undefined,
    wrist: metrics.wrist ? Number(metrics.wrist) / 2.54 : undefined,
    forearm: metrics.forearm ? Number(metrics.forearm) / 2.54 : undefined,
    unit: 'imperial'
  };
};