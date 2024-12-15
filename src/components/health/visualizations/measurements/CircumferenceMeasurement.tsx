import React from 'react';

interface CircumferenceMeasurementProps {
  type: 'neck' | 'waist' | 'hip' | 'wrist' | 'forearm';
}

const CircumferenceMeasurement = ({ type }: CircumferenceMeasurementProps) => {
  const getMeasurementPath = () => {
    switch (type) {
      case 'neck':
        return (
          <>
            {/* Full head and upper torso */}
            <path
              d="M35 10 C35 5 65 5 65 10 L65 15 C65 20 35 20 35 15 Z"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Neck */}
            <path
              d="M40 20 L60 20 L58 30 L42 30"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Shoulders and upper chest */}
            <path
              d="M25 35 L42 30 L58 30 L75 35 L70 50 L30 50"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement line */}
            <path
              d="M40 25 C40 28 60 28 60 25"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'waist':
        return (
          <>
            {/* Head */}
            <path
              d="M40 5 C40 2 60 2 60 5 L60 10 C60 13 40 13 40 10 Z"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Neck and shoulders */}
            <path
              d="M25 25 L40 15 L60 15 L75 25"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Torso */}
            <path
              d="M25 25 L30 60 L40 70 M75 25 L70 60 L60 70"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Arms */}
            <path
              d="M25 25 L20 45 M75 25 L80 45"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement line */}
            <path
              d="M30 40 C30 43 70 43 70 40"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'hip':
        return (
          <>
            {/* Upper body outline */}
            <path
              d="M40 5 L60 5 L65 20 L35 20"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Torso */}
            <path
              d="M35 20 L30 50 M65 20 L70 50"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Hip area */}
            <path
              d="M30 50 C30 65 70 65 70 50"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Legs */}
            <path
              d="M35 65 L35 80 M65 65 L65 80"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement line */}
            <path
              d="M30 55 C30 60 70 60 70 55"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'wrist':
        return (
          <>
            {/* Shoulder and upper arm */}
            <path
              d="M30 10 L70 10 L65 30"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Forearm */}
            <path
              d="M65 30 L55 60"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Hand */}
            <path
              d="M50 60 L45 70 C40 75 60 75 55 70 L50 60"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement line */}
            <path
              d="M45 55 C45 58 55 58 55 55"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'forearm':
        return (
          <>
            {/* Shoulder and upper arm */}
            <path
              d="M30 10 L70 10 L65 30"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Forearm */}
            <path
              d="M65 30 L55 60"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Hand */}
            <path
              d="M50 60 L45 70 C40 75 60 75 55 70 L50 60"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement line */}
            <path
              d="M50 40 C50 43 65 43 65 40"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
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

export default CircumferenceMeasurement;