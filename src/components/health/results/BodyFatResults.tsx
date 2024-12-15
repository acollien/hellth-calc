import BodyFatCard from "./cards/BodyFatCard";

interface BodyFatResultsProps {
  bodyFat: {
    navy: number | null;
    jackson: number | null;
    bmiBased: number | null;
    army: number | null;
  };
  gender: 'male' | 'female';
}

const BodyFatResults = ({ bodyFat, gender }: BodyFatResultsProps) => {
  console.log('BodyFat Results Props:', { bodyFat, gender });

  const tooltipContent = {
    navy: {
      title: "U.S. Navy Method",
      description: "Uses circumference measurements for accurate body fat estimation.",
      formula: gender === 'male' 
        ? "495 / (1.0324 - 0.19077 × log₁₀(waist - neck) + 0.15456 × log₁₀(height)) - 450"
        : "495 / (1.29579 - 0.35004 × log₁₀(waist + hip - neck) + 0.22100 × log₁₀(height)) - 450",
      ranges: {
        male: [
          "Essential Fat: 2-5%",
          "Athletes: 6-13%",
          "Fitness: 14-17%",
          "Average: 18-24%",
          "Obese: 25%+"
        ],
        female: [
          "Essential Fat: 10-13%",
          "Athletes: 14-20%",
          "Fitness: 21-24%",
          "Average: 25-31%",
          "Obese: 32%+"
        ]
      }
    },
    jackson: {
      title: "Jackson-Pollock Method",
      description: "Uses multiple skinfold measurements for precise body fat calculation.",
      formula: gender === 'male'
        ? "Body Density = 1.10938 - (0.0008267 × sum) + (0.0000016 × sum²) - (0.0002574 × age)\nBody Fat % = (495 / Body Density) - 450"
        : "Body Density = 1.089733 - (0.0009245 × sum) + (0.0000025 × sum²) - (0.0000979 × age)\nBody Fat % = (495 / Body Density) - 450",
      ranges: {
        male: [
          "Essential Fat: 2-5%",
          "Athletes: 6-13%",
          "Fitness: 14-17%",
          "Average: 18-24%",
          "Obese: 25%+"
        ],
        female: [
          "Essential Fat: 10-13%",
          "Athletes: 14-20%",
          "Fitness: 21-24%",
          "Average: 25-31%",
          "Obese: 32%+"
        ]
      }
    },
    bmiBased: {
      title: "BMI-Based Estimation",
      description: "Estimates body fat using BMI correlation and demographic factors.",
      formula: gender === 'male'
        ? "Body Fat % = (1.20 × BMI) + (0.23 × age) - 16.2"
        : "Body Fat % = (1.20 × BMI) + (0.23 × age) - 5.4",
      ranges: {
        male: [
          "Very Low: <8%",
          "Low: 8-15%",
          "Normal: 15-20%",
          "Moderate: 20-25%",
          "High: >25%"
        ],
        female: [
          "Very Low: <15%",
          "Low: 15-22%",
          "Normal: 22-27%",
          "Moderate: 27-32%",
          "High: >32%"
        ]
      }
    },
    army: {
      title: "U.S. Army Method",
      description: "Official method used by the U.S. Army for body fat assessment.",
      formula: gender === 'male'
        ? "86.010 × log₁₀(waist - neck) - 70.041 × log₁₀(height) + 36.76"
        : "163.205 × log₁₀(waist + hip - neck) - 97.684 × log₁₀(height) - 78.387",
      ranges: {
        male: [
          "17-20 years: <20%",
          "21-27 years: <22%",
          "28-39 years: <24%",
          "40+ years: <26%"
        ],
        female: [
          "17-20 years: <30%",
          "21-27 years: <32%",
          "28-39 years: <34%",
          "40+ years: <36%"
        ]
      }
    }
  };

  return (
    <div className="space-y-4 w-full">
      <h3 className="text-lg font-medium text-mint-800">Body Fat Percentage</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {Object.entries(bodyFat).map(([key, value]) => {
          console.log(`Processing ${key} with value:`, value);
          
          // Only render if value is a valid number
          if (typeof value === 'number' && !isNaN(value)) {
            return (
              <BodyFatCard
                key={key}
                methodKey={key}
                value={value}
                gender={gender}
                tooltipContent={tooltipContent[key as keyof typeof tooltipContent]}
              />
            );
          }
          console.log(`Skipping ${key} - invalid value:`, value);
          return null;
        })}
      </div>
    </div>
  );
};

export default BodyFatResults;