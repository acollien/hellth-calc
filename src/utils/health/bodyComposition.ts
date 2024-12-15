import { HealthMetrics, BodyFatResult } from './types';
import { convertToMetric } from './conversions';

export const calculateBodyFat = (metrics: HealthMetrics): BodyFatResult => {
  console.log('Calculating body fat with metrics:', metrics);
  const metricMetrics = convertToMetric(metrics);
  
  const results: BodyFatResult = {
    navy: null,
    jackson: null,
    bmiBased: null,
    army: null
  };

  // Navy Method
  if (metricMetrics.neck && metricMetrics.waist && metricMetrics.hip && metricMetrics.height && metricMetrics.gender) {
    if (metricMetrics.gender === 'male') {
      results.navy = 495 / (1.0324 - 0.19077 * Math.log10(metricMetrics.waist - metricMetrics.neck) + 0.15456 * Math.log10(metricMetrics.height)) - 450;
    } else {
      results.navy = 495 / (1.29579 - 0.35004 * Math.log10(metricMetrics.waist + metricMetrics.hip - metricMetrics.neck) + 0.22100 * Math.log10(metricMetrics.height)) - 450;
    }
  }

  // Jackson-Pollock Method
  if (metricMetrics.chest && metricMetrics.abdominal && metricMetrics.thigh && metricMetrics.age && metricMetrics.gender) {
    const sum = metricMetrics.chest + metricMetrics.abdominal + metricMetrics.thigh;
    if (metricMetrics.gender === 'male') {
      results.jackson = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * metricMetrics.age);
      results.jackson = (495 / results.jackson) - 450;
    } else {
      results.jackson = 1.089733 - (0.0009245 * sum) + (0.0000025 * sum * sum) - (0.0000979 * metricMetrics.age);
      results.jackson = (495 / results.jackson) - 450;
    }
  }

  // BMI-based estimation
  if (metricMetrics.height && metricMetrics.weight && metricMetrics.age && metricMetrics.gender) {
    const bmi = metricMetrics.weight / Math.pow(metricMetrics.height / 100, 2);
    results.bmiBased = metricMetrics.gender === 'male'
      ? (1.20 * bmi) + (0.23 * metricMetrics.age) - 16.2
      : (1.20 * bmi) + (0.23 * metricMetrics.age) - 5.4;
  }

  results.army = calculateArmyBodyFat(metricMetrics);
  console.log('Body fat calculation results:', results);
  return results;
};

export const calculateArmyBodyFat = (metrics: HealthMetrics) => {
  if (!metrics.gender || !metrics.neck || !metrics.waist || !metrics.height || (metrics.gender === 'female' && !metrics.hip)) {
    return null;
  }

  // Convert measurements to inches if they're in metric
  const heightInInches = metrics.unit === 'metric' ? metrics.height / 2.54 : metrics.height;
  const neckInInches = metrics.unit === 'metric' ? metrics.neck / 2.54 : metrics.neck;
  const waistInInches = metrics.unit === 'metric' ? metrics.waist / 2.54 : metrics.waist;
  const hipInInches = metrics.gender === 'female' ? (metrics.unit === 'metric' ? metrics.hip / 2.54 : metrics.hip) : 0;

  let bodyFat: number;
  
  if (metrics.gender === 'male') {
    bodyFat = 86.010 * Math.log10(waistInInches - neckInInches) - 70.041 * Math.log10(heightInInches) + 36.76;
  } else {
    bodyFat = 163.205 * Math.log10(waistInInches + hipInInches - neckInInches) - 97.684 * Math.log10(heightInInches) - 78.387;
  }

  return Math.max(0, Math.min(bodyFat, 100)); // Ensure result is between 0 and 100
};
