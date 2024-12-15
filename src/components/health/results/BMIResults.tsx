import { useMemo } from "react";
import BMICard from "./bmi/BMICard";

interface BMIResultsProps {
  bmi: {
    standard: number;
    devine: number;
    athletic: number;
    bmiBased: number;
  };
}

const BMIResults = ({ bmi }: BMIResultsProps) => {
  console.log("BMIResults received bmi values:", bmi);

  const bmiRanges = useMemo(() => [
    {
      min: 0,
      max: 18.5,
      label: "Underweight",
      color: "#D3E4FD",
      description: "BMI less than 18.5"
    },
    {
      min: 18.5,
      max: 24.9,
      label: "Normal",
      color: "#F2FCE2",
      description: "BMI between 18.5 and 24.9"
    },
    {
      min: 25,
      max: 29.9,
      label: "Overweight",
      color: "#FEC6A1",
      description: "BMI between 25 and 29.9"
    },
    {
      min: 30,
      max: 40,
      label: "Obese",
      color: "#ea384c",
      description: "BMI 30 or greater"
    }
  ], []);

  const bmiDescriptions = useMemo(() => ({
    standard: {
      title: "Standard BMI",
      formula: "Weight (kg) / Height² (m)",
      description: "The traditional Body Mass Index calculation. Most widely used but doesn't account for muscle mass or body composition.",
      interpretation: "• Under 18.5: Underweight\n• 18.5-24.9: Normal weight\n• 25-29.9: Overweight\n• 30+: Obese"
    },
    devine: {
      title: "Devine BMI",
      formula: "(Weight / Ideal Weight) × 21.7",
      description: "Adjusted BMI calculation that considers frame size and gender.",
      interpretation: "• Under 19: Underweight\n• 19-24: Ideal range\n• 24-29: Slightly overweight\n• 29-34: Overweight\n• 34+: Significantly overweight"
    },
    athletic: {
      title: "Athletic BMI",
      formula: "Standard BMI × 0.9",
      description: "Modified BMI calculation specifically for athletic body types.",
      interpretation: "• Under 16.5: Too lean\n• 16.5-22.5: Athletic build\n• 22.5-27: Muscular build\n• Above 27: May need body composition assessment"
    },
    bmiBased: {
      title: "BMI Based Range",
      formula: "Based on standard BMI ranges",
      description: "A range calculation derived from standard BMI categories.",
      interpretation: "• Under 18.5: Below healthy range\n• 18.5-24.9: Healthy range\n• 25-29.9: Above healthy range\n• 30+: Well above healthy range"
    }
  }), []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">BMI Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {Object.entries(bmi).map(([key, value]) => {
          if (value === undefined || value === null) {
            console.log(`BMI value for ${key} is undefined or null`);
            return null;
          }
          const info = bmiDescriptions[key as keyof typeof bmiDescriptions];
          console.log(`Rendering BMI card for ${key} with value:`, value);
          return (
            <BMICard
              key={key}
              type={key}
              value={value}
              info={info}
              ranges={bmiRanges}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BMIResults;