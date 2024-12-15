import { HealthMetrics } from '../types';
import { calculateNavyBodyFat } from './navyMethod';
import { calculateJacksonPollockBodyFat } from './jacksonPollock';
import { calculateBMIBasedBodyFat } from './bmiBased';
import { calculateArmyBodyFat } from './armyMethod';

export const calculateBodyFat = (metrics: HealthMetrics) => {
  console.log('Calculating all body fat methods with metrics:', metrics);
  
  return {
    navy: calculateNavyBodyFat(metrics),
    jackson: calculateJacksonPollockBodyFat(metrics),
    bmiBased: calculateBMIBasedBodyFat(metrics),
    army: calculateArmyBodyFat(metrics)
  };
};