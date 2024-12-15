import { HealthMetrics } from '@/components/health/types';

export const calculateBodyFat = (metrics: HealthMetrics) => {
  console.log('Calculating body fat with metrics:', metrics);
  const results: { [key: string]: number | null } = {
    navy: null,
    jackson: null,
    bmiBased: null,
    army: null
  };

  // Navy Method
  if (metrics.neck && metrics.waist && metrics.hip && metrics.height && metrics.gender) {
    const neck = parseFloat(metrics.neck);
    const waist = parseFloat(metrics.waist);
    const hip = parseFloat(metrics.hip);
    const height = parseFloat(metrics.height);

    if (metrics.gender === 'male') {
      results.navy = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      results.navy = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
  }

  // Jackson-Pollock Method
  if (metrics.chestSkinfold && metrics.suprailiacSkinfold && metrics.thighSkinfold && metrics.age && metrics.gender) {
    console.log('Calculating Jackson-Pollock with:', {
      chest: metrics.chestSkinfold,
      suprailiac: metrics.suprailiacSkinfold,
      thigh: metrics.thighSkinfold,
      age: metrics.age,
      gender: metrics.gender
    });

    const sum = parseFloat(metrics.chestSkinfold) + parseFloat(metrics.suprailiacSkinfold) + parseFloat(metrics.thighSkinfold);
    if (metrics.gender === 'male') {
      results.jackson = 495 / (1.10938 - 0.0008267 * sum + 0.0000016 * sum * sum - 0.0002574 * parseFloat(metrics.age)) - 450;
    } else {
      results.jackson = 495 / (1.089733 - 0.0009245 * sum + 0.0000025 * sum * sum - 0.0000979 * parseFloat(metrics.age)) - 450;
    }
    console.log('Jackson-Pollock result:', results.jackson);
  }

  // BMI-based estimation
  if (metrics.height && metrics.weight && metrics.age && metrics.gender) {
    const height = parseFloat(metrics.height);
    const weight = parseFloat(metrics.weight);
    const age = parseFloat(metrics.age);
    const bmi = weight / Math.pow(height / 100, 2);
    
    if (metrics.gender === 'male') {
      results.bmiBased = (1.20 * bmi) + (0.23 * age) - 16.2;
    } else {
      results.bmiBased = (1.20 * bmi) + (0.23 * age) - 5.4;
    }
  }

  // Army Method
  if (metrics.neck && metrics.waist && metrics.hip && metrics.height && metrics.gender) {
    const neck = parseFloat(metrics.neck);
    const waist = parseFloat(metrics.waist);
    const hip = parseFloat(metrics.hip);
    const height = parseFloat(metrics.height);

    if (metrics.gender === 'male') {
      results.army = (86.010 * Math.log10(waist - neck)) - (70.041 * Math.log10(height)) + 36.76;
    } else {
      results.army = (163.205 * Math.log10(waist + hip - neck)) - (97.684 * Math.log10(height)) - 78.387;
    }
  }

  console.log('Final body fat results:', results);
  return results;
};

export const calculateLeanBodyMass = (metrics: HealthMetrics): number | null => {
  console.log('Calculating lean body mass with metrics:', metrics);
  if (!metrics.weight || !metrics.height || !metrics.gender) return null;

  const weight = metrics.unit === 'metric' ? parseFloat(metrics.weight) : parseFloat(metrics.weight) * 0.453592;
  const height = metrics.unit === 'metric' ? parseFloat(metrics.height) : parseFloat(metrics.height) * 2.54;

  // Boer Formula
  return metrics.gender === 'male'
    ? (0.407 * weight) + (0.267 * height) - 19.2
    : (0.252 * weight) + (0.473 * height) - 48.3;
};

export const calculateFatFreeMassIndex = (metrics: HealthMetrics): number | null => {
  console.log('Calculating fat-free mass index with metrics:', metrics);
  const lbm = calculateLeanBodyMass(metrics);
  if (!lbm || !metrics.height) return null;

  const heightInMeters = metrics.unit === 'metric' ? parseFloat(metrics.height) / 100 : parseFloat(metrics.height) * 0.0254;
  return lbm / (heightInMeters * heightInMeters);
};

export const calculateSkeletalMuscleMass = (metrics: HealthMetrics): number | null => {
  console.log('Calculating skeletal muscle mass with metrics:', metrics);
  if (!metrics.weight || !metrics.height || !metrics.age || !metrics.gender) return null;

  const weight = metrics.unit === 'metric' ? parseFloat(metrics.weight) : parseFloat(metrics.weight) * 0.453592;
  const height = metrics.unit === 'metric' ? parseFloat(metrics.height) : parseFloat(metrics.height) * 2.54;
  
  const genderFactor = metrics.gender === 'male' ? 2.29 : 0;
  return (0.244 * weight) + (0.117 * height) - (0.127 * parseFloat(metrics.age)) + genderFactor - 2.98;
};

export const calculateBodyFatDistribution = (metrics: HealthMetrics): number | null => {
  console.log('Calculating body fat distribution with metrics:', metrics);
  if (!metrics.waist || !metrics.hip || !metrics.height) return null;

  const waist = metrics.unit === 'metric' ? parseFloat(metrics.waist) : parseFloat(metrics.waist) * 2.54;
  const hip = metrics.unit === 'metric' ? parseFloat(metrics.hip) : parseFloat(metrics.hip) * 2.54;
  const height = metrics.unit === 'metric' ? parseFloat(metrics.height) : parseFloat(metrics.height) * 2.54;

  return (waist * waist) / (hip * height);
};

export const calculateWaistToHipRatio = (metrics: HealthMetrics): number | null => {
  console.log('Calculating waist-to-hip ratio with metrics:', metrics);
  if (!metrics.waist || !metrics.hip) return null;

  const waist = parseFloat(metrics.waist);
  const hip = parseFloat(metrics.hip);

  return waist / hip;
};