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

  const athletic = robinson * 0.95; // Athletic ideal weight
  const bmiBased = height * height * 21.75 / 10000; // Based on BMI of 21.75

  return {
    robinson,
    miller,
    devine,
    athletic,
    bmiBased
  };
};