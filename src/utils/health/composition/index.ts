import { calculateBodyFatDistribution } from '../calculations/bodyFatDistribution';

export const calculateComposition = (metrics: any) => {
  console.log('Calculating composition with metrics:', metrics);
  
  const height = parseFloat(metrics.height);
  const waist = parseFloat(metrics.waist);
  const hip = parseFloat(metrics.hip);

  return {
    bodyFatDistribution: calculateBodyFatDistribution(waist, hip, height)
  };
};
