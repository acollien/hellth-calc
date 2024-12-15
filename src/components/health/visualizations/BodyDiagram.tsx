import React from 'react';
import CircumferenceMeasurement from './measurements/CircumferenceMeasurement';
import SkinfoldMeasurement from './measurements/SkinfoldMeasurement';
import { cn } from "@/lib/utils";

interface BodyDiagramProps {
  gender: 'male' | 'female';
  measurementType: string;
  className?: string;
}

const BodyDiagram = ({ gender, measurementType, className }: BodyDiagramProps) => {
  const isCircumference = ['neck', 'waist', 'hip', 'wrist', 'forearm'].includes(measurementType);
  const isSkinfold = ['triceps', 'subscapular', 'suprailiac', 'abdominal', 'thigh', 'chest'].includes(measurementType);

  return (
    <div className={cn("relative w-32 h-32", className)}>
      {isCircumference && (
        <CircumferenceMeasurement 
          type={measurementType as 'neck' | 'waist' | 'hip' | 'wrist' | 'forearm'} 
        />
      )}
      {isSkinfold && (
        <SkinfoldMeasurement 
          type={measurementType as 'triceps' | 'subscapular' | 'suprailiac' | 'abdominal' | 'thigh' | 'chest'} 
        />
      )}
    </div>
  );
};

export default BodyDiagram;