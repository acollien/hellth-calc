export const calculateWaistToHeightRatio = (waist: number, height: number) => {
  if (!waist || !height) return null;
  return waist / height;
};