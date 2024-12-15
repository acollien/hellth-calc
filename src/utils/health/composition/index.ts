import { calculateBodyFat } from './bodyFat';
import { calculateLeanBodyMass } from './leanMass';
import { calculateSkeletalMuscleMass } from './muscleMass';
import { calculateFatFreeMassIndex } from './fatFreeMass';
import { calculateBodyFatDistribution } from '../calculations/bodyFatDistribution';

// Re-export individual calculation functions
export {
  calculateBodyFat,
  calculateLeanBodyMass,
  calculateSkeletalMuscleMass,
  calculateFatFreeMassIndex
};

// Export the composition calculator
export const calculateComposition = (metrics: any) => {
  console.log('Calculating composition with metrics:', metrics);
  
  const height = parseFloat(metrics.height);
  const waist = parseFloat(metrics.waist);
  const hip = parseFloat(metrics.hip);

  return {
    bodyFatDistribution: calculateBodyFatDistribution(waist, hip, height)
  };
};