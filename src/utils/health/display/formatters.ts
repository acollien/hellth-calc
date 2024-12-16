export const formatValue = (value: number | null | undefined, precision: number = 1): string => {
  if (value === null || value === undefined || isNaN(value)) return 'N/A';
  return value.toFixed(precision);
};

export const formatPercentage = (value: number | null | undefined, precision: number = 1): string => {
  const formatted = formatValue(value, precision);
  return formatted === 'N/A' ? formatted : `${formatted}%`;
};

export const formatWeight = (value: number | null | undefined, unit: 'metric' | 'imperial' = 'metric', precision: number = 1): string => {
  const formatted = formatValue(value, precision);
  return formatted === 'N/A' ? formatted : `${formatted} ${unit === 'metric' ? 'kg' : 'lbs'}`;
};

export const formatHeight = (value: number | null | undefined, unit: 'metric' | 'imperial' = 'metric', precision: number = 1): string => {
  const formatted = formatValue(value, precision);
  return formatted === 'N/A' ? formatted : `${formatted} ${unit === 'metric' ? 'cm' : 'in'}`;
};