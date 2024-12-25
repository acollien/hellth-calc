export const bodyFatTooltips = {
  navy: {
    title: "U.S. Navy Method",
    description: "Uses circumference measurements to estimate body fat percentage.",
    formula: {
      male: "495 / (1.0324 - 0.19077 × log10(waist-neck) + 0.15456 × log10(height)) - 450",
      female: "495 / (1.29579 - 0.35004 × log10(waist+hip-neck) + 0.22100 × log10(height)) - 450"
    }
  },
  jackson: {
    title: "Jackson-Pollock Method",
    description: "Uses skinfold measurements to calculate body density and estimate body fat percentage.",
    formula: {
      male: "Body Density = 1.10938 - (0.0008267 × sum) + (0.0000016 × sum²) - (0.0002574 × age)",
      female: "Body Density = 1.089733 - (0.0009245 × sum) + (0.0000025 × sum²) - (0.0000979 × age)"
    }
  },
  bmiBased: {
    title: "Enhanced BMI-Based Method",
    description: "A refined BMI-based calculation that includes adjustments for age groups, gender differences, and BMI ranges to provide more accurate estimates.",
    formula: {
      male: "Base: (1.20 × BMI) + (0.23 × age) - 16.2\nWith adjustments for:\n- BMI ranges\n- Age groups\n- Gender-specific factors",
      female: "Base: (1.20 × BMI) + (0.23 × age) - 5.4\nWith adjustments for:\n- BMI ranges\n- Age groups\n- Gender-specific factors"
    }
  },
  army: {
    title: "U.S. Army Method",
    description: "Uses circumference-based calculations following U.S. Army standards.",
    formula: {
      male: "Body Fat % = (86.010 × log10(abdomen - neck)) - (70.041 × log10(height)) + 36.76",
      female: "Body Fat % = (163.205 × log10(waist + hip - neck)) - (97.684 × log10(height)) - 78.387"
    }
  }
};