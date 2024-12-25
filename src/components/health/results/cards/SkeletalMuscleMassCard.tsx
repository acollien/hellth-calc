import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface SkeletalMuscleMassCardProps {
  value: number;
  unit: 'metric' | 'imperial';
}

const SkeletalMuscleMassCard = ({ value, unit }: SkeletalMuscleMassCardProps) => {
  const getSMMColor = (value: number) => {
    if (value < 25) return "text-blue-600";
    if (value < 45) return "text-green-600";
    if (value < 55) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-start justify-between cursor-pointer">
            <div>
              <div className="text-sm text-mint-800 font-medium">Skeletal Muscle Mass</div>
              <div className={`text-2xl font-semibold ${getSMMColor(value)}`}>
                {value.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
              </div>
            </div>
            <Info className="h-4 w-4 text-mint-500" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-2">
            <h4 className="font-semibold">Skeletal Muscle Mass (SMM)</h4>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">SMM = Height² × (0.244 × Weight + 7.8)</p>
              </div>
              <div>
                <p className="font-medium">Description:</p>
                <p>The total mass of all muscles that are voluntarily controlled and attached to the skeleton, crucial for movement and metabolism.</p>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                <ul className="list-disc pl-4">
                  <li>Below 25 kg: Low muscle mass</li>
                  <li>25-45 kg: Normal muscle mass</li>
                  <li>45-55 kg: Athletic muscle mass</li>
                  <li>Above 55 kg: Elite muscle mass</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkeletalMuscleMassCard;