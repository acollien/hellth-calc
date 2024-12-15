import React from 'react';

interface SkinfoldMeasurementProps {
  type: 'triceps' | 'subscapular' | 'suprailiac' | 'abdominal' | 'thigh' | 'chest';
}

const SkinfoldMeasurement = ({ type }: SkinfoldMeasurementProps) => {
  const getMeasurementPath = () => {
    switch (type) {
      case 'triceps':
        return (
          <path
            d="M45 25 C45 35 55 35 55 25 M50 20 L50 40"
            className="stroke-mint-800 stroke-2 fill-none"
          />
        );
      case 'subscapular':
        return (
          <path
            d="M40 30 L60 30 M45 25 L55 35"
            className="stroke-mint-800 stroke-2 fill-none"
          />
        );
      case 'suprailiac':
        return (
          <path
            d="M40 45 L60 45 M45 40 L55 50"
            className="stroke-mint-800 stroke-2 fill-none"
          />
        );
      case 'abdominal':
        return (
          <path
            d="M45 40 C45 50 55 50 55 40 M48 35 L52 45"
            className="stroke-mint-800 stroke-2 fill-none"
          />
        );
      case 'thigh':
        return (
          <path
            d="M45 55 L55 55 M48 50 L52 60"
            className="stroke-mint-800 stroke-2 fill-none"
          />
        );
      case 'chest':
        return (
          <path
            d="M40 30 C40 40 60 40 60 30 M45 25 L55 35"
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
      <line 
        x1="45" 
        y1="35" 
        x2="55" 
        y2="35" 
        className="stroke-mint-500 stroke-[1.5] stroke-dashed animate-pulse" 
      />
    </svg>
  );
};

export default SkinfoldMeasurement;