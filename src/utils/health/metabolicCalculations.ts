import { HealthMetrics } from './types';
import { convertToMetric } from './conversions';

export const calculateBMR = (metrics: HealthMetrics) => {
  console.log('Calculating BMR with metrics:', metrics);
  if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) return null;

  const metricMetrics = convertToMetric(metrics);

  // Mifflin-St Jeor Equation
  const bmr = metricMetrics.gender === 'male'
    ? (10 * metricMetrics.weight) + (6.25 * metricMetrics.height) - (5 * metricMetrics.age) + 5
    : (10 * metricMetrics.weight) + (6.25 * metricMetrics.height) - (5 * metricMetrics.age) - 161;

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const tdee = metrics.activityLevel 
    ? bmr * activityMultipliers[metrics.activityLevel]
    : null;

  console.log('BMR calculation results:', { bmr, tdee });
  return { bmr, tdee };
};