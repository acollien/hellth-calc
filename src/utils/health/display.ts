export const getValueColor = (value: number, ranges: { min: number; color: string }[]): string => {
  for (const range of ranges) {
    if (value < range.min) return range.color;
  }
  return ranges[ranges.length - 1].color;
};

export const formatValue = (value: number | null | undefined, precision: number = 1): string => {
  if (value === null || value === undefined || isNaN(value)) return 'N/A';
  return value.toFixed(precision);
};

export const valueRanges = {
  bmi: [
    { min: 18.5, color: "text-blue-600" },
    { min: 25, color: "text-green-600" },
    { min: 30, color: "text-yellow-600" },
    { min: Infinity, color: "text-red-600" }
  ],
  bodyFat: [
    { min: 10, color: "text-blue-600" },
    { min: 20, color: "text-green-600" },
    { min: 30, color: "text-yellow-600" },
    { min: Infinity, color: "text-red-600" }
  ],
  // Add other common ranges here
};