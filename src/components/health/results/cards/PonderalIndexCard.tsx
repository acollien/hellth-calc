import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface PonderalIndexCardProps {
  value: { metric: number; imperial: number };
  unit: 'metric' | 'imperial';
}

const PonderalIndexCard = ({ value, unit }: PonderalIndexCardProps) => {
  const getValueColor = (value: number) => {
    if (value < 11) return "text-blue-600";
    if (value < 14) return "text-green-600";
    if (value < 17) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex-1">
              <span className="text-sm text-mint-800 font-medium flex items-center gap-2">
                Ponderal Index
                <Info className="h-4 w-4 text-mint-500" />
              </span>
              <div className={`text-2xl font-semibold ${getValueColor(value[unit])}`}>
                {value[unit].toFixed(2)}
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-2">
            <h4 className="font-semibold">Ponderal Index (PI)</h4>
            <p>A measure of leanness that accounts for the natural scaling of mass with height, particularly useful for taller individuals where BMI may be less accurate.</p>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">PI = Weight / Height³</p>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                <ul className="list-disc pl-4">
                  <li>&lt;11: Underweight status - May indicate insufficient body mass</li>
                  <li>11-14: Normal weight range - Optimal range for health</li>
                  <li>14-17: Overweight range - Increased health risks</li>
                  <li>&gt;17: Obese range - Significantly elevated health risks</li>
                </ul>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <p className="font-medium">Citation:</p>
                <a 
                  href="https://pubmed.ncbi.nlm.nih.gov/3520004/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Ponderal Index Research Study
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PonderalIndexCard;