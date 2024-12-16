export const calculateIdealWeight = (height: number, gender: 'male' | 'female') => {
  const heightInInches = height / 2.54;
  
  // Calculate base ideal weights using standard formulas
  const robinson = gender === 'male'
    ? 52 + 1.9 * (heightInInches - 60)
    : 49 + 1.7 * (heightInInches - 60);
    
  const miller = gender === 'male'
    ? 56.2 + 1.41 * (heightInInches - 60)
    : 53.1 + 1.36 * (heightInInches - 60);
    
  const devine = gender === 'male'
    ? 50 + 2.3 * (heightInInches - 60)
    : 45.5 + 2.3 * (heightInInches - 60);

  // Calculate athletic ideal weight (10% more than standard)
  const athletic = robinson * 1.1;

  // Calculate BMI-based ideal weight using a target BMI of 21.7
  const heightInMeters = height / 100;
  const bmiBased = 21.7 * (heightInMeters * heightInMeters);
  
  return {
    robinson,
    miller,
    devine,
    athletic,
    bmiBased
  };
};