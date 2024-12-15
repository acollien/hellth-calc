import React from 'react';

interface SkinfoldMeasurementProps {
  type: 'triceps' | 'subscapular' | 'suprailiac' | 'abdominal' | 'thigh' | 'chest';
}

const SkinfoldMeasurement = ({ type }: SkinfoldMeasurementProps) => {
  const getMeasurementPath = () => {
    switch (type) {
      case 'triceps':
        return (
          <>
            {/* Arm outline */}
            <path
              d="M40 20 L60 20 C65 30 65 50 60 60 L40 60 C35 50 35 30 40 20"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement point */}
            <path
              d="M45 40 L55 40 M50 35 L50 45"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'subscapular':
        return (
          <>
            {/* Upper back outline */}
            <path
              d="M30 20 L70 20 L75 50 L25 50 Z"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Shoulder blades */}
            <path
              d="M40 30 L60 30 M45 40 L55 40"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement point */}
            <path
              d="M45 35 L55 35"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'suprailiac':
        return (
          <>
            {/* Hip area outline */}
            <path
              d="M30 20 L70 20 L75 50 C75 60 25 60 25 50 Z"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement point */}
            <path
              d="M45 35 L55 35 M50 30 L50 40"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'abdominal':
        return (
          <>
            {/* Torso outline */}
            <path
              d="M35 20 L65 20 L70 60 L30 60 Z"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Navel indicator */}
            <circle
              cx="50"
              cy="40"
              r="2"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement point */}
            <path
              d="M45 40 L55 40"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'thigh':
        return (
          <>
            {/* Thigh outline */}
            <path
              d="M40 20 C35 30 35 50 40 60 L60 60 C65 50 65 30 60 20"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement point */}
            <path
              d="M45 40 L55 40 M50 35 L50 45"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'chest':
        return (
          <>
            {/* Chest outline */}
            <path
              d="M30 20 L70 20 L75 50 L25 50 Z"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement point */}
            <path
              d="M40 35 L60 35"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {getMeasurementPath()}
    </svg>
  );
};

export default SkinfoldMeasurement;