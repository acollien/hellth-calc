import { HealthMetrics } from '@/components/health/types';

export const convertToMetric = (metrics: HealthMetrics): HealthMetrics => {
  if (metrics.unit === 'metric') return metrics;

  return {
    ...metrics,
    height: (parseFloat(metrics.height) * 2.54).toString(),
    weight: (parseFloat(metrics.weight) * 0.453592).toString(),
    neck: metrics.neck ? (parseFloat(metrics.neck) * 2.54).toString() : '',
    waist: metrics.waist ? (parseFloat(metrics.waist) * 2.54).toString() : '',
    hip: metrics.hip ? (parseFloat(metrics.hip) * 2.54).toString() : '',
    wrist: metrics.wrist ? (parseFloat(metrics.wrist) * 2.54).toString() : '',
    forearm: metrics.forearm ? (parseFloat(metrics.forearm) * 2.54).toString() : ''
  };
};

export const convertToImperial = (metrics: HealthMetrics): HealthMetrics => {
  if (metrics.unit === 'imperial') return metrics;

  return {
    ...metrics,
    height: (parseFloat(metrics.height) / 2.54).toString(),
    weight: (parseFloat(metrics.weight) / 0.453592).toString(),
    neck: metrics.neck ? (parseFloat(metrics.neck) / 2.54).toString() : '',
    waist: metrics.waist ? (parseFloat(metrics.waist) / 2.54).toString() : '',
    hip: metrics.hip ? (parseFloat(metrics.hip) / 2.54).toString() : '',
    wrist: metrics.wrist ? (parseFloat(metrics.wrist) / 2.54).toString() : '',
    forearm: metrics.forearm ? (parseFloat(metrics.forearm) / 2.54).toString() : ''
  };
};