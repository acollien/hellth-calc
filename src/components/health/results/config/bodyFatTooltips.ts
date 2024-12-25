export const bodyFatTooltips = {
  navy: {
    title: "U.S. Navy Method",
    description: "Uses circumference measurements to estimate body fat percentage. Validated against hydrostatic weighing.",
    formula: {
      male: "495 / (1.0324 - 0.19077 × log10(waist-neck) + 0.15456 × log10(height)) - 450",
      female: "495 / (1.29579 - 0.35004 × log10(waist+hip-neck) + 0.22100 × log10(height)) - 450"
    },
    citation: {
      text: "View U.S. Navy Method Validation Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/3140611/"
    }
  },
  jackson: {
    title: "Jackson-Pollock Method",
    description: "Uses skinfold measurements to calculate body density and estimate body fat percentage.",
    formula: {
      male: "Body Density = 1.10938 - (0.0008267 × sum) + (0.0000016 × sum²) - (0.0002574 × age)",
      female: "Body Density = 1.089733 - (0.0009245 × sum) + (0.0000025 × sum²) - (0.0000979 × age)"
    },
    citation: {
      text: "View Jackson-Pollock Method Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/497191/"
    }
  },
  bmiBased: {
    title: "Deurenberg BMI Method",
    description: "Uses the validated Deurenberg equation (1991) to estimate body fat percentage based on BMI, age, and gender.",
    formula: {
      male: "Body Fat % = (1.20 × BMI) + (0.23 × age) - (10.8 × 1) - 5.4",
      female: "Body Fat % = (1.20 × BMI) + (0.23 × age) - 5.4"
    },
    citation: {
      text: "View Deurenberg Method Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/1895261/"
    }
  },
  army: {
    title: "U.S. Army Method",
    description: "Uses circumference-based calculations following U.S. Army standards, validated against hydrostatic weighing.",
    formula: {
      male: "Body Fat % = (86.010 × log10(abdomen - neck)) - (70.041 × log10(height)) + 36.76",
      female: "Body Fat % = (163.205 × log10(waist + hip - neck)) - (97.684 × log10(height)) - 78.387"
    },
    citation: {
      text: "View U.S. Army Method Validation Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/15741861/"
    }
  }
};