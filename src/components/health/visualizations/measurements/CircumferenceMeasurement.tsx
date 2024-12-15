import React from 'react';

interface CircumferenceMeasurementProps {
  type: 'neck' | 'waist' | 'hip' | 'wrist' | 'forearm';
}

const CircumferenceMeasurement = ({ type }: CircumferenceMeasurementProps) => {
  const getMeasurementPath = () => {
    switch (type) {
      case 'neck':
        return (
          <path
            d="M45 15 C45 25 55 25 55 15 M50 15 L50 35"
            className="stroke-mint-800 stroke-2 fill-none"
          />
        );
      case 'waist':
        return (
          <path
            d="M40 30 C40 40 60 40 60 30 M45 25 L55 25"
            className="stroke-mint-800 stroke-2 fill-none"
          />
        );
      case 'hip':
        return (
          <path
            d="M35 45 C35 55 65 55 65 45 M40 40 L60 40"
            className="stroke-mint-800 stroke-2 fill-none"
          />
        );
      case 'wrist':
        return (
          <path
            d="M45 45 L55 45 M48 42 L52 42"
            className="stroke-mint-800 stroke-2 fill-none"
          />
        );
      case 'forearm':
        return (
          <path
            d="M42 35 L58 35 M45 32 L55 32"
            className="stroke-mint-800 stroke-2 fill-none"
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {getMeasurementPath()}
      <circle 
        cx="50" 
        cy="40" 
        r="15" 
        className="stroke-mint-500 fill-none stroke-[1.5] stroke-dashed animate-pulse" 
      />
    </svg>
  );
};

export default CircumferenceMeasurement;