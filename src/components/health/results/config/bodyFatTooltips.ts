interface TooltipRanges {
  male: string[];
  female: string[];
}

interface TooltipContent {
  title: string;
  description: string;
  formula: string;
  ranges: TooltipRanges;
}

export const bodyFatTooltips: Record<string, TooltipContent> = {
  navy: {
    title: "U.S. Navy Method",
    description: "Uses circumference measurements for accurate body fat estimation.",
    formula: {
      male: "495 / (1.0324 - 0.19077 × log₁₀(waist - neck) + 0.15456 × log₁₀(height)) - 450",
      female: "495 / (1.29579 - 0.35004 × log₁₀(waist + hip - neck) + 0.22100 × log₁₀(height)) - 450"
    },
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
    formula: {
      male: "Body Density = 1.10938 - (0.0008267 × sum) + (0.0000016 × sum²) - (0.0002574 × age)\nBody Fat % = (495 / Body Density) - 450",
      female: "Body Density = 1.089733 - (0.0009245 × sum) + (0.0000025 × sum²) - (0.0000979 × age)\nBody Fat % = (495 / Body Density) - 450"
    },
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
    formula: {
      male: "Body Fat % = (1.20 × BMI) + (0.23 × age) - 10.8 - 5.4",
      female: "Body Fat % = (1.20 × BMI) + (0.23 × age) - 5.4"
    },
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
    formula: {
      male: "86.010 × log₁₀(waist - neck) - 70.041 × log₁₀(height) + 36.76",
      female: "163.205 × log₁₀(waist + hip - neck) - 97.684 × log₁₀(height) - 78.387"
    },
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