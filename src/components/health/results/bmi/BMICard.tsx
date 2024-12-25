import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RangeBar from "@/components/health/visualizations/RangeBar";
import BMIDescription from "./BMIDescription";

interface BMICardProps {
  type: string;
  value: number;
  info: {
    title: string;
    formula: string;
    description: string;
    interpretation: string;
  };
  ranges: Array<{
    min: number;
    max: number;
    label: string;
    color: string;
    description: string;
  }>;
}

const BMICard = ({ type, value, info, ranges }: BMICardProps) => {
  console.log(`Rendering BMI card for ${type} with value:`, value);
  
  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <div className="mb-2">
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm text-mint-800 font-medium">{info.title}</span>
              <Info className="h-4 w-4 text-mint-500" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <BMIDescription {...info} />
          </DialogContent>
        </Dialog>
        <div className="text-2xl font-semibold text-mint-900">
          {value.toFixed(1)}
        </div>
      </div>
      <RangeBar
        value={value}
        ranges={ranges}
        max={40}
      />
    </div>
  );
};

export default BMICard;