interface HealthMetrics {
  height: number;
  weight: number;
  age?: number;
  gender?: 'male' | 'female';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  unit?: 'metric' | 'imperial';
}

export const calculateBMR = (metrics: HealthMetrics) => {
  if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) return null;

  // Convert to metric if needed
  const weightInKg = metrics.unit === 'imperial' ? metrics.weight * 0.453592 : metrics.weight;
  const heightInCm = metrics.unit === 'imperial' ? metrics.height * 2.54 : metrics.height;

  // Mifflin-St Jeor Equation
  const bmr = metrics.gender === 'male'
    ? (10 * weightInKg) + (6.25 * heightInCm) - (5 * metrics.age) + 5
    : (10 * weightInKg) + (6.25 * heightInCm) - (5 * metrics.age) - 161;

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const tdee = metrics.activityLevel 
    ? bmr * activityMultipliers[metrics.activityLevel]
    : null;

  return { bmr, tdee };
};