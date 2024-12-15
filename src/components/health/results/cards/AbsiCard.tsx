import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AbsiCardProps {
  value: { metric: number; imperial: number };
  unit: 'metric' | 'imperial';
}

const AbsiCard = ({ value, unit }: AbsiCardProps) => {
  const getValueColor = (value: number) => {
    if (value < 0.07) return "text-green-600";
    if (value < 0.08) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <div className="flex items-center gap-2">
        <span className="text-sm text-mint-800 font-medium">A Body Shape Index</span>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-mint-500" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs p-4">
            <div className="space-y-2">
              <h4 className="font-semibold">A Body Shape Index (ABSI)</h4>
              <p>ABSI is based on waist circumference adjusted for height and weight. It's designed to be a better predictor of premature mortality than BMI.</p>
              <div className="text-sm space-y-1">
                <p className="font-medium">Method:</p>
                <p>Developed by Krakauer & Krakauer (2012) to quantify the risk associated with central obesity.</p>
                <p className="font-medium mt-2">Formula:</p>
                <p className="text-mint-700">ABSI = WC / (BMI^(2/3) × Height^(1/2))</p>
                <p className="text-mint-700">Where:</p>
                <ul className="list-disc pl-4">
                  <li>WC = Waist Circumference (m)</li>
                  <li>BMI = Body Mass Index (kg/m²)</li>
                  <li>Height (m)</li>
                </ul>
                <p className="font-medium mt-2">Interpretation:</p>
                <ul className="list-disc pl-4">
                  <li>Below 0.07: Low mortality risk</li>
                  <li>0.07-0.08: Average mortality risk</li>
                  <li>Above 0.08: High mortality risk</li>
                </ul>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className={`text-2xl font-semibold ${getValueColor(value[unit])}`}>
        {value[unit].toFixed(5)}
      </div>
    </div>
  );
};

export default AbsiCard;