type ColorRange = {
  min: number;
  color: string;
};

export const getValueColor = (value: number, ranges: ColorRange[]): string => {
  for (const range of ranges) {
    if (value < range.min) return range.color;
  }
  return ranges[ranges.length - 1].color;
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
  waistToHip: [
    { min: 0.85, color: "text-green-600" },
    { min: 0.95, color: "text-yellow-600" },
    { min: Infinity, color: "text-red-600" }
  ],
  waistToHeight: [
    { min: 0.4, color: "text-blue-600" },
    { min: 0.5, color: "text-green-600" },
    { min: 0.6, color: "text-yellow-600" },
    { min: Infinity, color: "text-red-600" }
  ],
  metabolicRate: [
    { min: 1200, color: "text-blue-600" },
    { min: 1800, color: "text-green-600" },
    { min: 2200, color: "text-yellow-600" },
    { min: Infinity, color: "text-red-600" }
  ]
};