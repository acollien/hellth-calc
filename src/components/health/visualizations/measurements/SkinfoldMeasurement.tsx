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
            {/* Head and neck */}
            <path
              d="M40 5 C40 2 60 2 60 5 L60 15 C60 18 40 18 40 15 Z"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Shoulders */}
            <path
              d="M20 30 L40 20 L60 20 L80 30"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Arms */}
            <path
              d="M20 30 L25 50 L30 70 M80 30 L75 50 L70 70"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Torso */}
            <path
              d="M40 20 L35 70 M60 20 L65 70"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement point */}
            <path
              d="M75 45 L73 43 M75 45 L77 43"
              className="stroke-mint-500 stroke-[1.5]"
            />
          </>
        );
      case 'subscapular':
        return (
          <>
            {/* Head and neck */}
            <path
              d="M40 5 C40 2 60 2 60 5 L60 15 C60 18 40 18 40 15 Z"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Back view - shoulders */}
            <path
              d="M25 30 L40 20 L60 20 L75 30"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Back and spine */}
            <path
              d="M50 20 L50 70 M25 30 L35 70 M75 30 L65 70"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement point */}
            <path
              d="M45 35 L43 33 M45 35 L47 33"
              className="stroke-mint-500 stroke-[1.5]"
            />
          </>
        );
      case 'suprailiac':
        return (
          <>
            {/* Upper body */}
            <path
              d="M40 5 L60 5 L65 20 L35 20"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Torso */}
            <path
              d="M35 20 L30 60 M65 20 L70 60"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Hip area */}
            <path
              d="M30 60 C30 70 70 70 70 60"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement point */}
            <path
              d="M65 55 L63 53 M65 55 L67 53"
              className="stroke-mint-500 stroke-[1.5]"
            />
          </>
        );
      case 'abdominal':
        return (
          <>
            {/* Upper body */}
            <path
              d="M40 5 L60 5 L65 20 L35 20"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Torso with abdomen */}
            <path
              d="M35 20 L30 70 M65 20 L70 70"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Navel indicator */}
            <circle
              cx="50"
              cy="45"
              r="2"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement point */}
            <path
              d="M55 45 L53 43 M55 45 L57 43"
              className="stroke-mint-500 stroke-[1.5]"
            />
          </>
        );
      case 'thigh':
        return (
          <>
            {/* Hip area */}
            <path
              d="M30 10 C30 5 70 5 70 10"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Legs */}
            <path
              d="M35 10 L30 70 M65 10 L70 70"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Knee indication */}
            <path
              d="M30 70 C30 75 70 75 70 70"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement point */}
            <path
              d="M35 40 L33 38 M35 40 L37 38"
              className="stroke-mint-500 stroke-[1.5]"
            />
          </>
        );
      case 'chest':
        return (
          <>
            {/* Head and neck */}
            <path
              d="M40 5 C40 2 60 2 60 5 L60 15 C60 18 40 18 40 15 Z"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Shoulders and arms */}
            <path
              d="M20 30 L40 20 L60 20 L80 30"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Chest and torso */}
            <path
              d="M40 20 L35 70 M60 20 L65 70"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Arms */}
            <path
              d="M20 30 L25 50 M80 30 L75 50"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement point */}
            <path
              d="M45 35 L43 33 M45 35 L47 33"
              className="stroke-mint-500 stroke-[1.5]"
            />
          </>
        );
    }
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {getMeasurementPath()}
    </svg>
  );
};

export default SkinfoldMeasurement;