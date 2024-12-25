import { MetricRange } from './types';

export const metricRanges: Record<string, MetricRange> = {
  "BMI": {
    ranges: [
      { min: 0, max: 18.5, label: "Underweight", description: "Below healthy range" },
      { min: 18.5, max: 24.9, label: "Normal", description: "Healthy range" },
      { min: 25, max: 29.9, label: "Overweight", description: "Above healthy range" },
      { min: 30, max: 100, label: "Obese", description: "Well above healthy range" }
    ]
  },
  "Body Fat % (Navy)": {
    ranges: [
      { min: 0, max: 5, label: "Very Low", description: "Essential fat levels" },
      { min: 6, max: 13, label: "Low", description: "Athletic condition" },
      { min: 14, max: 17, label: "Normal", description: "Fitness level" },
      { min: 18, max: 24, label: "Moderate", description: "Average range" },
      { min: 25, max: 100, label: "High", description: "Above average" }
    ]
  },
  "Fat Free Mass Index": {
    ranges: [
      { min: 0, max: 16, label: "Low", description: "Below normal muscle mass" },
      { min: 16, max: 20, label: "Normal", description: "Healthy muscle mass" },
      { min: 20, max: 100, label: "High", description: "Above average muscle mass" }
    ]
  },
  "Skeletal Muscle Mass": {
    ranges: [
      { min: 0, max: 30, label: "Low", description: "Below average muscle mass" },
      { min: 30, max: 40, label: "Normal", description: "Healthy muscle mass" },
      { min: 40, max: 100, label: "High", description: "Athletic muscle mass" }
    ],
    unit: "%"
  },
  "Lean Mass Index": {
    ranges: [
      { min: 0, max: 18, label: "Low", description: "Below normal lean mass" },
      { min: 18, max: 25, label: "Normal", description: "Healthy lean mass" },
      { min: 25, max: 100, label: "High", description: "Above average lean mass" }
    ]
  },
  "Ponderal Index": {
    ranges: [
      { min: 0, max: 13, label: "Underweight", description: "Below normal range" },
      { min: 13, max: 15, label: "Normal", description: "Healthy range" },
      { min: 15, max: 100, label: "Overweight", description: "Above normal range" }
    ]
  },
  "ABSI": {
    ranges: [
      { min: 0, max: 1, label: "Low Risk", description: "Healthy body shape" },
      { min: 1, max: 2, label: "Moderate Risk", description: "Increased health risk" },
      { min: 2, max: 100, label: "High Risk", description: "Significant health risk" }
    ]
  },
  "Body Roundness Index": {
    ranges: [
      { min: 0, max: 4, label: "Normal", description: "Healthy body roundness" },
      { min: 4, max: 6, label: "Overweight", description: "Above normal roundness" },
      { min: 6, max: 100, label: "Obese", description: "High body roundness" }
    ]
  },
  "Body Adiposity Index": {
    ranges: [
      { min: 0, max: 21, label: "Underweight", description: "Below normal adiposity" },
      { min: 21, max: 33, label: "Normal", description: "Healthy adiposity" },
      { min: 33, max: 100, label: "Overweight", description: "Above normal adiposity" }
    ]
  },
  "Conicity Index": {
    ranges: [
      { min: 0, max: 1.25, label: "Low Risk", description: "Healthy conicity" },
      { min: 1.25, max: 1.35, label: "Moderate Risk", description: "Increased health risk" },
      { min: 1.35, max: 100, label: "High Risk", description: "High health risk" }
    ]
  },
  "Waist to Hip Ratio": {
    ranges: [
      { min: 0, max: 0.85, label: "Low Risk", description: "Healthy distribution" },
      { min: 0.85, max: 0.95, label: "Moderate Risk", description: "Increased health risk" },
      { min: 0.95, max: 100, label: "High Risk", description: "High health risk" }
    ]
  },
  "Waist to Height Ratio": {
    ranges: [
      { min: 0, max: 0.5, label: "Low Risk", description: "Healthy proportion" },
      { min: 0.5, max: 0.6, label: "Moderate Risk", description: "Increased health risk" },
      { min: 0.6, max: 100, label: "High Risk", description: "High health risk" }
    ]
  }
};

export const getBiologicalAgeInterpretation = (bioAge: number, actualAge: number): string => {
  const difference = bioAge - actualAge;
  if (Math.abs(difference) < 0.1) return "Matches chronological age";
  return difference > 0 
    ? `${Math.abs(difference).toFixed(1)} years older than chronological age`
    : `${Math.abs(difference).toFixed(1)} years younger than chronological age`;
};

export const getMetricRange = (metric: string, value: number | string): string => {
  if (typeof value === 'string') {
    if (metric === "Frame Size") return value;
    return "Invalid value";
  }

  if (typeof value !== 'number' || isNaN(value)) {
    return "Invalid value";
  }

  const metricConfig = metricRanges[metric];
  if (!metricConfig) {
    console.log(`No range configuration found for metric: ${metric}`);
    return "";
  }

  const range = metricConfig.ranges.find(r => value >= r.min && value <= r.max);
  if (!range) {
    console.log(`No matching range found for metric: ${metric} with value: ${value}`);
    return "";
  }

  const valueWithUnit = metricConfig.unit ? `${value.toFixed(1)}${metricConfig.unit}` : value.toFixed(1);
  return `${range.label} (${valueWithUnit}): ${range.description}`;
};