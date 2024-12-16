export const calculateIdealWeight = (height: number, gender: 'male' | 'female') => {
  const heightInInches = height / 2.54;
  
  const robinson = gender === 'male'
    ? 52 + 1.9 * (heightInInches - 60)
    : 49 + 1.7 * (heightInInches - 60);
    
  const miller = gender === 'male'
    ? 56.2 + 1.41 * (heightInInches - 60)
    : 53.1 + 1.36 * (heightInInches - 60);
    
  const devine = gender === 'male'
    ? 50 + 2.3 * (heightInInches - 60)
    : 45.5 + 2.3 * (heightInInches - 60);
    
  const athletic = gender === 'male'
    ? (robinson + miller + devine) / 3 * 1.1
    : (robinson + miller + devine) / 3 * 1.05;
    
  const bmiBased = gender === 'male'
    ? (heightInInches - 60) * 2.7 + 48
    : (heightInInches - 60) * 2.2 + 45;

  return {
    robinson,
    miller,
    devine,
    athletic,
    bmiBased
  };
};