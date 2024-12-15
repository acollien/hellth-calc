import React from 'react';
import { cn } from "@/lib/utils";

interface BodyDiagramProps {
  gender: 'male' | 'female';
  measurementType: string;
  className?: string;
}

const BodyDiagram = ({ gender, measurementType, className }: BodyDiagramProps) => {
  const getMeasurementPath = () => {
    switch (measurementType) {
      case 'neck':
        return (
          <g>
            <path d="M40 30 C40 40 60 40 60 30" className="stroke-mint-800" />
            <path d="M40 30 C40 20 60 20 60 30" className="stroke-mint-800" />
            <circle cx="50" cy="30" r="15" className="stroke-mint-500 stroke-dasharray-2 fill-none animate-pulse" />
            <text x="70" y="30" className="text-xs fill-mint-700">Measure around middle of neck</text>
          </g>
        );
      case 'chest':
        return (
          <g>
            <path d="M30 50 C30 70 70 70 70 50" className="stroke-mint-800" />
            <path d="M30 50 C30 30 70 30 70 50" className="stroke-mint-800" />
            <path d="M30 50 L70 50" className="stroke-mint-500 stroke-dasharray-2 animate-pulse" />
            <text x="75" y="50" className="text-xs fill-mint-700">Measure at nipple level</text>
          </g>
        );
      // Add similar detailed anatomical drawings for other measurements
      default:
        return null;
    }
  };

  return (
    <div className={cn("relative w-32 h-32", className)}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
      >
        {getMeasurementPath()}
      </svg>
    </div>
  );
};

export default BodyDiagram;
