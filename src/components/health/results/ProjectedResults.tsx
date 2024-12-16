import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

interface ProjectedResultsProps {
  bmi: {
    standard: number;
    devine: number;
    athletic: number;
    bmiBased: number;
  };
  bodyFat: {
    navy: number | null;
    jackson: number | null;
    bmiBased: number | null;
    army: number | null;
  };
  bmr: {
    bmr: number;
    tdee?: number;
  };
  unit: 'metric' | 'imperial';
}

const ProjectedResults = ({ bmi, bodyFat, bmr, unit }: ProjectedResultsProps) => {
  // Generate projection data for the next 12 weeks
  const projectionData = Array.from({ length: 13 }, (_, week) => {
    const weeklyBMIReduction = 0.25; // Estimated healthy BMI reduction per week
    const weeklyBodyFatReduction = 0.5; // Estimated body fat % reduction per week
    
    return {
      week,
      bmi: Math.max(bmi.standard - (weeklyBMIReduction * week), 18.5),
      bodyFat: Math.max(bodyFat.navy ? bodyFat.navy - (weeklyBodyFatReduction * week) : 0, 10),
      calories: bmr.tdee ? bmr.tdee - (500 * (week > 0 ? 1 : 0)) : 0
    };
  });

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-mint-800 mb-4">Projected Results (12 Weeks)</h3>
      <div className="w-full h-[400px]">
        <ChartContainer
          className="w-full h-full"
          config={{
            bmi: { color: "#10b981" },
            bodyFat: { color: "#3b82f6" },
            calories: { color: "#ef4444" }
          }}
        >
          <LineChart data={projectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <ChartTooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="bmi"
              name="BMI"
              stroke="#10b981"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="bodyFat"
              name="Body Fat %"
              stroke="#3b82f6"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="calories"
              name="Daily Calories"
              stroke="#ef4444"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default ProjectedResults;