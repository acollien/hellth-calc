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
            <path 
              d="M40 25 C40 35 60 35 60 25 C60 15 40 15 40 25" 
              className="stroke-mint-800 fill-none stroke-2"
            />
            <circle 
              cx="50" 
              cy="25" 
              r="12" 
              className="stroke-mint-500 stroke-dasharray-2 fill-none animate-pulse" 
            />
            <text x="70" y="25" className="text-xs fill-mint-700">
              Measure around middle of neck
            </text>
          </g>
        );
      case 'chest':
        return (
          <g>
            <path 
              d="M30 45 C30 65 70 65 70 45 C70 25 30 25 30 45" 
              className="stroke-mint-800 fill-none stroke-2"
            />
            <line 
              x1="30" 
              y1="45" 
              x2="70" 
              y2="45" 
              className="stroke-mint-500 stroke-dasharray-2 animate-pulse" 
            />
            <text x="75" y="45" className="text-xs fill-mint-700">
              Measure at nipple level
            </text>
          </g>
        );
      case 'waist':
        return (
          <g>
            <path 
              d="M35 50 C35 70 65 70 65 50 C65 30 35 30 35 50" 
              className="stroke-mint-800 fill-none stroke-2"
            />
            <circle 
              cx="50" 
              cy="50" 
              r="15" 
              className="stroke-mint-500 stroke-dasharray-2 fill-none animate-pulse" 
            />
            <text x="70" y="50" className="text-xs fill-mint-700">
              Measure at navel level
            </text>
          </g>
        );
      case 'hip':
        return (
          <g>
            <path 
              d="M30 60 C30 80 70 80 70 60 C70 40 30 40 30 60" 
              className="stroke-mint-800 fill-none stroke-2"
            />
            <circle 
              cx="50" 
              cy="60" 
              r="20" 
              className="stroke-mint-500 stroke-dasharray-2 fill-none animate-pulse" 
            />
            <text x="75" y="60" className="text-xs fill-mint-700">
              Measure at widest point
            </text>
          </g>
        );
      case 'wrist':
        return (
          <g>
            <path 
              d="M45 50 C45 55 55 55 55 50 C55 45 45 45 45 50" 
              className="stroke-mint-800 fill-none stroke-2"
            />
            <circle 
              cx="50" 
              cy="50" 
              r="5" 
              className="stroke-mint-500 stroke-dasharray-2 fill-none animate-pulse" 
            />
            <text x="60" y="50" className="text-xs fill-mint-700">
              Measure around wrist
            </text>
          </g>
        );
      case 'forearm':
        return (
          <g>
            <path 
              d="M40 45 C40 55 60 55 60 45 C60 35 40 35 40 45" 
              className="stroke-mint-800 fill-none stroke-2"
            />
            <circle 
              cx="50" 
              cy="45" 
              r="10" 
              className="stroke-mint-500 stroke-dasharray-2 fill-none animate-pulse" 
            />
            <text x="65" y="45" className="text-xs fill-mint-700">
              Measure at widest point
            </text>
          </g>
        );
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