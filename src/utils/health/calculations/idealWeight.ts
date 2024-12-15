export const calculateIdealWeight = (height: number, gender: 'male' | 'female') => {
  const heightInInches = height / 2.54;
  
  return {
    robinson: gender === 'male'
      ? 52 + 1.9 * (heightInInches - 60)
      : 49 + 1.7 * (heightInInches - 60),
    miller: gender === 'male'
      ? 56.2 + 1.41 * (heightInInches - 60)
      : 53.1 + 1.36 * (heightInInches - 60),
    devine: gender === 'male'
      ? 50 + 2.3 * (heightInInches - 60)
      : 45.5 + 2.3 * (heightInInches - 60)
  };
};