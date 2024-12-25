import { MetricRange } from './types';

export const metricRanges: Record<string, MetricRange> = {
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
  // ... Add other ranges following the same pattern
};

export const getBiologicalAgeInterpretation = (bioAge: number, actualAge: number): string => {
  const difference = bioAge - actualAge;
  if (difference === 0) return "Matches chronological age";
  return difference > 0 
    ? `${Math.abs(difference)} years older than chronological age`
    : `${Math.abs(difference)} years younger than chronological age`;
};

export const getMetricRange = (metric: string, value: number | string): string => {
  if (typeof value === 'string') {
    if (metric === "Frame Size") return value;
    return "Invalid value";
  }

  const metricConfig = metricRanges[metric];
  if (!metricConfig) return "";

  const range = metricConfig.ranges.find(r => value >= r.min && value <= r.max);
  if (!range) return "";

  const valueWithUnit = metricConfig.unit ? `${value}${metricConfig.unit}` : value;
  return `${range.label} (${valueWithUnit}): ${range.description}`;
};