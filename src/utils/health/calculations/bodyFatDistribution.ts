export const calculateBodyFatDistribution = (waist: number, hip: number, height: number) => {
  if (!waist || !hip || !height) return null;
  
  // Convert measurements to meters for height
  const heightInMeters = height / 100;
  
  // Calculate Body Fat Distribution Index (BFDI)
  // Formula: (Waist² × Height) / (Hip² × √Height)
  const bfdi = (Math.pow(waist, 2) * heightInMeters) / 
               (Math.pow(hip, 2) * Math.sqrt(heightInMeters));
               
  console.log('Calculating BFDI:', { waist, hip, height, bfdi });
  
  return Number(bfdi.toFixed(2));
};