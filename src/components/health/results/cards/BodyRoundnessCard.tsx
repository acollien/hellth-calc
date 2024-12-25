import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface BodyRoundnessCardProps {
  value: { metric: number; imperial: number };
  unit: 'metric' | 'imperial';
}

const BodyRoundnessCard = ({ value, unit }: BodyRoundnessCardProps) => {
  const getValueColor = (value: number) => {
    if (value < 1) return "text-blue-600";
    if (value < 2) return "text-green-600";
    if (value < 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-mint-800 font-medium">Body Roundness Index</span>
            <Info className="h-4 w-4 text-mint-500" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-2">
            <h4 className="font-semibold">Body Roundness Index (BRI)</h4>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">BRI = 364.2 - 365.5 × √(1 - ((WC / (2π))² / (0.09 × H²)))</p>
              </div>
              <div>
                <p className="font-medium">Description:</p>
                <p>A measure that uses an elliptical model of human body shape to predict body fat percentage and evaluate overall body shape.</p>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                <ul className="list-disc pl-4">
                  <li>Below 1: Very lean body composition</li>
                  <li>1-2: Normal/healthy body composition</li>
                  <li>2-3: Overweight body composition</li>
                  <li>Above 3: Obese body composition</li>
                </ul>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <p className="font-medium">Citation:</p>
                <a 
                  href="https://doi.org/10.1371/journal.pone.0103483"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Thomas DM, Bredlau C, Bosy-Westphal A, et al. Relationships between body roundness with body fat and visceral adipose tissue emerging from a new geometrical model. Obesity (Silver Spring). 2013;21(11):2264-2271.
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className={`text-2xl font-semibold ${getValueColor(value[unit])}`}>
        {value[unit].toFixed(2)}
      </div>
    </div>
  );
};

export default BodyRoundnessCard;