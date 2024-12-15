import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface Group4ResultsProps {
  bmi: number;
  bodyFat: number;
  bmr: number;
  unit: 'metric' | 'imperial';
}

const Group4Results = ({ bmi, bodyFat, bmr, unit }: Group4ResultsProps) => {
  const getBMIColor = (value: number) => {
    if (value < 18.5) return "text-blue-600";
    if (value < 25) return "text-green-600";
    if (value < 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getBodyFatColor = (value: number) => {
    if (value < 10) return "text-blue-600";
    if (value < 20) return "text-green-600";
    if (value < 25) return "text-yellow-600";
    return "text-red-600";
  };

  const getBMRColor = (value: number) => {
    if (value < 1200) return "text-blue-600";
    if (value < 1800) return "text-green-600";
    if (value < 2200) return "text-yellow-600";
    return "text-red-600";
  };

  // Generate trend data for visualization
  const trendData = [
    { name: 'Current', bmi, bodyFat, bmr: bmr / 1000 },
    { name: '+1 Month', bmi: bmi * 0.98, bodyFat: bodyFat * 0.97, bmr: (bmr * 1.02) / 1000 },
    { name: '+2 Months', bmi: bmi * 0.96, bodyFat: bodyFat * 0.95, bmr: (bmr * 1.03) / 1000 },
    { name: '+3 Months', bmi: bmi * 0.95, bodyFat: bodyFat * 0.93, bmr: (bmr * 1.04) / 1000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-mint-800">Health Metrics Visualization</h3>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-mint-500" />
          </TooltipTrigger>
          <TooltipContent align="start" className="max-w-xs p-4">
            <div className="text-left">
              <p>This chart shows projected trends based on current metrics and typical healthy lifestyle changes.</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="h-[300px] w-full bg-white p-4 rounded-lg shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip />
            <Line 
              type="monotone" 
              dataKey="bmi" 
              stroke="#2a9587" 
              name="BMI"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="bodyFat" 
              stroke="#44b5a5" 
              name="Body Fat %"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="bmr" 
              stroke="#74d4c4" 
              name="BMR (k/cal)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <div className="text-sm text-mint-800 font-medium">BMI Trend</div>
          <div className={`text-2xl font-semibold ${getBMIColor(bmi * 0.95)}`}>
            {(bmi * 0.95).toFixed(1)}
          </div>
          <div className="text-sm text-mint-600">Projected in 3 months</div>
        </div>

        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <div className="text-sm text-mint-800 font-medium">Body Fat % Trend</div>
          <div className={`text-2xl font-semibold ${getBodyFatColor(bodyFat * 0.93)}`}>
            {(bodyFat * 0.93).toFixed(1)}%
          </div>
          <div className="text-sm text-mint-600">Projected in 3 months</div>
        </div>

        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <div className="text-sm text-mint-800 font-medium">BMR Trend</div>
          <div className={`text-2xl font-semibold ${getBMRColor(bmr * 1.04)}`}>
            {Math.round(bmr * 1.04)}
          </div>
          <div className="text-sm text-mint-600">Projected in 3 months</div>
        </div>
      </div>
    </div>
  );
};

export default Group4Results;