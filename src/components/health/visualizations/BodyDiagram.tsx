import React from 'react';
import { cn } from "@/lib/utils";

interface BodyDiagramProps {
  gender: 'male' | 'female';
  measurementType: string;
  className?: string;
}

const BodyDiagram = ({ gender, measurementType, className }: BodyDiagramProps) => {
  const getDiagramPath = () => {
    const basePath = gender === 'male' ? 'M' : 'F';
    
    switch (measurementType) {
      case 'neck':
        return `${basePath}_NECK`;
      case 'waist':
        return `${basePath}_WAIST`;
      case 'hip':
        return `${basePath}_HIP`;
      case 'wrist':
        return `${basePath}_WRIST`;
      case 'forearm':
        return `${basePath}_FOREARM`;
      case 'triceps':
        return `${basePath}_TRICEPS`;
      case 'subscapular':
        return `${basePath}_SUBSCAPULAR`;
      case 'suprailiac':
        return `${basePath}_SUPRAILIAC`;
      case 'abdominal':
        return `${basePath}_ABDOMINAL`;
      case 'thigh':
        return `${basePath}_THIGH`;
      case 'chest':
        return `${basePath}_CHEST`;
      default:
        return `${basePath}_FULL`;
    }
  };

  return (
    <div className={cn("relative w-24 h-32", className)}>
      <svg
        viewBox="0 0 100 140"
        className="w-full h-full stroke-mint-800 fill-none stroke-2"
      >
        {/* Base figure - simplified human outline */}
        <path d="M50 20 C60 20 65 15 65 10 C65 5 60 0 50 0 C40 0 35 5 35 10 C35 15 40 20 50 20" />
        <path d="M35 20 L35 45 L30 60 L35 80 L33 140" />
        <path d="M65 20 L65 45 L70 60 L65 80 L67 140" />
        <path d="M35 45 L65 45" />
        
        {/* Measurement-specific highlights */}
        {measurementType === 'neck' && (
          <circle cx="50" cy="15" r="12" className="stroke-mint-500 animate-pulse" />
        )}
        {measurementType === 'chest' && (
          <path d="M35 45 L65 45" className="stroke-mint-500 stroke-4 animate-pulse" />
        )}
        {measurementType === 'waist' && (
          <path d="M30 60 L70 60" className="stroke-mint-500 stroke-4 animate-pulse" />
        )}
        {measurementType === 'hip' && (
          <path d="M35 80 L65 80" className="stroke-mint-500 stroke-4 animate-pulse" />
        )}
        {/* Add measurement guide arrows */}
        {measurementType !== 'full' && (
          <path
            d="M10 70 L90 70"
            className="stroke-mint-300 stroke-dasharray-2"
            strokeDasharray="4"
          />
        )}
      </svg>
    </div>
  );
};

export default BodyDiagram;