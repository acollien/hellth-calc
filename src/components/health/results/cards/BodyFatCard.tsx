import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface BodyFatCardProps {
  methodKey: string;
  value: number;
  gender: 'male' | 'female';
  tooltipContent: {
    title: string;
    description: string;
    formula: string;
    ranges: {
      male: string[];
      female: string[];
    };
  };
}

const getBodyFatColor = (bodyFat: number, gender: 'male' | 'female') => {
  const ranges = gender === 'male' 
    ? { low: 6, healthy: 24, high: 32 }
    : { low: 14, healthy: 31, high: 39 };

  if (bodyFat < ranges.low) return "text-blue-600";
  if (bodyFat < ranges.healthy) return "text-green-600";
  if (bodyFat < ranges.high) return "text-yellow-600";
  return "text-red-600";
};

const BodyFatCard = ({ methodKey, value, gender, tooltipContent }: BodyFatCardProps) => {
  console.log(`Rendering BodyFatCard for ${methodKey} with value:`, value);
  
  return (
    <div className="flex-1 p-4 rounded-lg bg-mint-50 border border-mint-100 w-full">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-mint-800 font-medium capitalize">
              {methodKey.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <Info className="h-4 w-4 text-mint-500" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-2">
            <h4 className="font-semibold">{tooltipContent.title}</h4>
            <p>{tooltipContent.description}</p>
            <div className="text-sm space-y-1">
              <p className="font-medium">Formula:</p>
              <p className="text-mint-700 whitespace-pre-line">
                {tooltipContent.formula}
              </p>
              <p className="font-medium mt-2">Ranges ({gender === 'male' ? 'Men' : 'Women'}):</p>
              <ul className="list-disc pl-4">
                {tooltipContent.ranges[gender].map((range, index) => (
                  <li key={index}>{range}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className={`text-2xl font-semibold mt-2 ${getBodyFatColor(value, gender)}`}>
        {value.toFixed(1)}%
      </div>
    </div>
  );
};

export default BodyFatCard;