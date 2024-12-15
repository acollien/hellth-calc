import { HealthMetrics } from "@/components/health/types";

const randomInRange = (min: number, max: number): number => {
  return Number((Math.random() * (max - min) + min).toFixed(1));
};

export const generateTestData = (): HealthMetrics => {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const unit = 'metric';
  
  // Generate base measurements
  const height = randomInRange(160, 190); // cm
  const weight = randomInRange(50, 100); // kg
  const age = randomInRange(18, 65);
  
  // Generate body measurements
  const neck = randomInRange(30, 45); // cm
  const waist = randomInRange(60, 100); // cm
  const hip = randomInRange(80, 120); // cm
  const wrist = randomInRange(14, 20); // cm
  const forearm = randomInRange(20, 35); // cm
  
  // Generate skinfold measurements (in mm)
  const skinfoldMin = 5;
  const skinfoldMax = 30;
  
  return {
    height: height.toString(),
    weight: weight.toString(),
    age: age.toString(),
    gender,
    neck: neck.toString(),
    waist: waist.toString(),
    hip: hip.toString(),
    wrist: wrist.toString(),
    forearm: forearm.toString(),
    chestSkinfold: randomInRange(skinfoldMin, skinfoldMax).toString(),
    midaxillarySkinfold: randomInRange(skinfoldMin, skinfoldMax).toString(),
    suprailiacSkinfold: randomInRange(skinfoldMin, skinfoldMax).toString(),
    thighSkinfold: randomInRange(skinfoldMin, skinfoldMax).toString(),
    umbilicalSkinfold: randomInRange(skinfoldMin, skinfoldMax).toString(),
    tricepsSkinfold: randomInRange(skinfoldMin, skinfoldMax).toString(),
    subscapularSkinfold: randomInRange(skinfoldMin, skinfoldMax).toString(),
    calfSkinfold: randomInRange(skinfoldMin, skinfoldMax).toString(),
    midaxillarySkinfold2: randomInRange(skinfoldMin, skinfoldMax).toString(),
    activityLevel: ['sedentary', 'light', 'moderate', 'active', 'veryActive'][Math.floor(Math.random() * 5)] as HealthMetrics['activityLevel'],
    unit
  };
};