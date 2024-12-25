import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface LeanBodyMassCardProps {
  value: number;
  unit: 'metric' | 'imperial';
}

const LeanBodyMassCard = ({ value, unit }: LeanBodyMassCardProps) => {
  const getLBMColor = (value: number) => {
    if (value < 35) return "text-blue-600";
    if (value < 65) return "text-green-600";
    if (value < 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-start justify-between cursor-pointer">
            <div>
              <div className="text-sm text-mint-800 font-medium">Lean Body Mass</div>
              <div className={`text-2xl font-semibold ${getLBMColor(value)}`}>
                {value.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
              </div>
            </div>
            <Info className="h-4 w-4 text-mint-500" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-2">
            <h4 className="font-semibold">Lean Body Mass (LBM)</h4>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">LBM = Total Body Weight - (Body Weight × Body Fat Percentage)</p>
              </div>
              <div>
                <p className="font-medium">Description:</p>
                <p>The total mass of all body components except fat, including muscle, bone, organs, and body water.</p>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                <ul className="list-disc pl-4">
                  <li>Below 35 kg: Low lean mass</li>
                  <li>35-65 kg: Normal lean mass</li>
                  <li>65-80 kg: Athletic lean mass</li>
                  <li>Above 80 kg: High lean mass</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeanBodyMassCard;