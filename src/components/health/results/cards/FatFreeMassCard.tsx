import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface FatFreeMassCardProps {
  value: number;
}

const FatFreeMassCard = ({ value }: FatFreeMassCardProps) => {
  const getFFMIColor = (value: number) => {
    if (value < 16) return "text-blue-600";
    if (value < 20) return "text-green-600";
    if (value < 25) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-start justify-between cursor-pointer">
            <div>
              <div className="text-sm text-mint-800 font-medium">Fat-Free Mass Index</div>
              <div className={`text-2xl font-semibold ${getFFMIColor(value)}`}>
                {value.toFixed(1)}
              </div>
            </div>
            <Info className="h-4 w-4 text-mint-500" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-2">
            <h4 className="font-semibold">Fat-Free Mass Index (FFMI)</h4>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">FFMI = (Lean Mass in kg) / (Height in meters)²</p>
              </div>
              <div>
                <p className="font-medium">Description:</p>
                <p>A measure that evaluates lean body mass relative to height, providing insight into muscular development independent of body fat.</p>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                <ul className="list-disc pl-4">
                  <li>Below 16: Low muscle mass</li>
                  <li>16-20: Normal muscle mass</li>
                  <li>20-25: Above average/athletic</li>
                  <li>Above 25: Exceptional muscle mass</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FatFreeMassCard;