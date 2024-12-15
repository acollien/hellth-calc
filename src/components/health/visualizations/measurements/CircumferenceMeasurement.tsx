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
            {/* Head and neck */}
            <path
              d="M35 15 C35 10 65 10 65 15 C65 25 35 25 35 15"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Shoulders */}
            <path
              d="M25 35 L75 35"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement line */}
            <path
              d="M40 20 C40 30 60 30 60 20"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'waist':
        return (
          <>
            {/* Torso outline */}
            <path
              d="M35 20 L65 20 L70 50 L30 50 Z"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement line */}
            <path
              d="M30 35 C30 45 70 45 70 35"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'hip':
        return (
          <>
            {/* Hip area outline */}
            <path
              d="M30 20 L70 20 L75 40 C75 50 25 50 25 40 Z"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement line */}
            <path
              d="M25 40 C25 50 75 50 75 40"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'wrist':
        return (
          <>
            {/* Forearm and wrist */}
            <path
              d="M40 20 L60 20 L65 50 L35 50"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement line */}
            <path
              d="M35 45 C35 48 65 48 65 45"
              className="stroke-mint-500 stroke-[1.5] stroke-dashed"
            />
          </>
        );
      case 'forearm':
        return (
          <>
            {/* Forearm */}
            <path
              d="M35 20 L65 20 L70 50 L30 50"
              className="stroke-mint-800 stroke-2 fill-none"
            />
            {/* Measurement line */}
            <path
              d="M30 35 C30 40 70 40 70 35"
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

export default CircumferenceMeasurement;