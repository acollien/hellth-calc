import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Range {
  min: number;
  max: number;
  label: string;
  color: string;
  description: string;
}

interface RangeBarProps {
  value: number;
  ranges: Range[];
  unit?: string;
  max: number;
}

const RangeBar = ({ value, ranges, unit = '', max }: RangeBarProps) => {
  const percentage = (value / max) * 100;
  
  const getCurrentRange = () => {
    return ranges.find(range => value >= range.min && value <= range.max);
  };

  const currentRange = getCurrentRange();

  return (
    <div className="space-y-2 w-full">
      <div className="relative h-8">
        {ranges.map((range, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div
                className="absolute h-full cursor-help transition-opacity"
                style={{
                  left: `${(range.min / max) * 100}%`,
                  width: `${((range.max - range.min) / max) * 100}%`,
                  backgroundColor: range.color,
                  opacity: currentRange === range ? 1 : 0.3,
                }}
              >
                <span className="text-xs absolute -bottom-6 left-0 text-mint-800">
                  {range.min}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">
                {range.label}: {range.description}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
        <div
          className="absolute w-0.5 h-full bg-mint-900 transition-all duration-300"
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default RangeBar;