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
            {/* Base neck shape */}
            <path 
              d="M45 35 C45 45 55 45 55 35 L55 25 C55 15 45 15 45 25 Z" 
              className="fill-mint-50 stroke-mint-800 stroke-2"
            />
            {/* Measurement indicator */}
            <circle 
              cx="50" 
              cy="30" 
              r="12" 
              className="stroke-mint-500 fill-none stroke-[1.5] stroke-dashed animate-pulse" 
            />
            {/* Instruction text */}
            <text x="65" y="30" className="text-[10px] fill-mint-700">
              Measure around middle
            </text>
          </g>
        );

      case 'waist':
        return (
          <g>
            {/* Base torso shape */}
            <path 
              d="M40 40 C40 60 60 60 60 40 L60 20 C60 0 40 0 40 20 Z" 
              className="fill-mint-50 stroke-mint-800 stroke-2"
            />
            {/* Measurement indicator */}
            <circle 
              cx="50" 
              cy="40" 
              r="15" 
              className="stroke-mint-500 fill-none stroke-[1.5] stroke-dashed animate-pulse" 
            />
            {/* Instruction text */}
            <text x="70" y="40" className="text-[10px] fill-mint-700">
              Measure at navel level
            </text>
          </g>
        );

      case 'hip':
        return (
          <g>
            {/* Base hip shape */}
            <path 
              d="M35 50 C35 70 65 70 65 50 L65 30 C65 10 35 10 35 30 Z" 
              className="fill-mint-50 stroke-mint-800 stroke-2"
            />
            {/* Measurement indicator */}
            <circle 
              cx="50" 
              cy="50" 
              r="20" 
              className="stroke-mint-500 fill-none stroke-[1.5] stroke-dashed animate-pulse" 
            />
            {/* Instruction text */}
            <text x="75" y="50" className="text-[10px] fill-mint-700">
              Measure at widest point
            </text>
          </g>
        );

      case 'wrist':
        return (
          <g>
            {/* Base wrist shape */}
            <path 
              d="M45 45 C45 50 55 50 55 45 L55 40 C55 35 45 35 45 40 Z" 
              className="fill-mint-50 stroke-mint-800 stroke-2"
            />
            {/* Measurement indicator */}
            <circle 
              cx="50" 
              cy="45" 
              r="8" 
              className="stroke-mint-500 fill-none stroke-[1.5] stroke-dashed animate-pulse" 
            />
            {/* Instruction text */}
            <text x="60" y="45" className="text-[10px] fill-mint-700">
              Measure around wrist
            </text>
          </g>
        );

      case 'forearm':
        return (
          <g>
            {/* Base forearm shape */}
            <path 
              d="M40 40 C40 50 60 50 60 40 L60 30 C60 20 40 20 40 30 Z" 
              className="fill-mint-50 stroke-mint-800 stroke-2"
            />
            {/* Measurement indicator */}
            <circle 
              cx="50" 
              cy="40" 
              r="12" 
              className="stroke-mint-500 fill-none stroke-[1.5] stroke-dashed animate-pulse" 
            />
            {/* Instruction text */}
            <text x="65" y="40" className="text-[10px] fill-mint-700">
              Measure at widest point
            </text>
          </g>
        );

      case 'triceps':
        return (
          <g>
            {/* Base arm shape */}
            <path 
              d="M45 40 C45 50 55 50 55 40 L55 30 C55 20 45 20 45 30 Z" 
              className="fill-mint-50 stroke-mint-800 stroke-2"
            />
            {/* Measurement point */}
            <circle 
              cx="50" 
              cy="35" 
              r="2" 
              className="fill-mint-500"
            />
            {/* Measurement line */}
            <line 
              x1="50" 
              y1="25" 
              x2="50" 
              y2="45" 
              className="stroke-mint-500 stroke-[1.5] stroke-dashed animate-pulse"
            />
            {/* Instruction text */}
            <text x="60" y="35" className="text-[10px] fill-mint-700">
              Measure back of arm
            </text>
          </g>
        );

      case 'subscapular':
        return (
          <g>
            {/* Base back shape */}
            <path 
              d="M40 30 C40 50 60 50 60 30 L60 10 C60 -10 40 -10 40 10 Z" 
              className="fill-mint-50 stroke-mint-800 stroke-2"
            />
            {/* Measurement point */}
            <circle 
              cx="50" 
              cy="30" 
              r="2" 
              className="fill-mint-500"
            />
            {/* Measurement line */}
            <line 
              x1="50" 
              y1="20" 
              x2="50" 
              y2="40" 
              className="stroke-mint-500 stroke-[1.5] stroke-dashed animate-pulse"
            />
            {/* Instruction text */}
            <text x="65" y="30" className="text-[10px] fill-mint-700">
              Below shoulder blade
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
        style={{ overflow: 'visible' }}
      >
        {getMeasurementPath()}
      </svg>
    </div>
  );
};

export default BodyDiagram;