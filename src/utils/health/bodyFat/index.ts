import { HealthMetrics } from '@/types/health';
import { calculateNavyBodyFat } from './navyMethod';
import { calculateJacksonPollockBodyFat } from './jacksonPollock';
import { calculateBMIBasedBodyFat } from './bmiBased';
import { calculateArmyBodyFat } from './armyMethod';

export const calculateBodyFat = (metrics: HealthMetrics) => {
  console.log('Calculating all body fat methods with metrics:', metrics);
  
  // Only calculate if gender is selected
  if (metrics.gender !== 'male' && metrics.gender !== 'female') {
    console.log('Skipping body fat calculation - no gender selected');
    return {
      navy: null,
      jackson: null,
      bmiBased: null,
      army: null
    };
  }

  // At this point TypeScript knows gender is either 'male' or 'female'
  const validMetrics = metrics as HealthMetrics & { gender: 'male' | 'female' };
  
  return {
    navy: calculateNavyBodyFat(validMetrics),
    jackson: calculateJacksonPollockBodyFat(validMetrics),
    bmiBased: calculateBMIBasedBodyFat(validMetrics),
    army: calculateArmyBodyFat(validMetrics)
  };
};