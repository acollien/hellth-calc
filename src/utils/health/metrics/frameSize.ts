interface FrameSizeParams {
  height: number;
  wrist: number;
  gender: 'male' | 'female';
  unit: 'metric' | 'imperial';
}

export const calculateFrameSize = ({ height, wrist, gender, unit }: FrameSizeParams): string | null => {
  console.log("Calculating frame size with params:", { height, wrist, gender, unit });
  
  if (!height || !wrist) {
    console.log("Missing required measurements for frame size calculation");
    return null;
  }

  // Convert to metric if needed
  if (unit === 'imperial') {
    height = height * 2.54;  // inches to cm
    wrist = wrist * 2.54;    // inches to cm
  }

  const ratio = height / wrist;
  console.log("Frame size ratio calculated:", ratio);

  if (gender === 'male') {
    if (ratio > 10.4) return 'small';
    if (ratio < 9.6) return 'large';
    return 'medium';
  } else {
    if (ratio > 11.0) return 'small';
    if (ratio < 10.1) return 'large';
    return 'medium';
  }
};