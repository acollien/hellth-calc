import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface WaistHeightCardProps {
  value: number;
}

const WaistHeightCard = ({ value }: WaistHeightCardProps) => {
  const getTextColor = (ratio: number) => {
    if (ratio < 0.4) return "text-blue-600";
    if (ratio < 0.5) return "text-green-600";
    if (ratio < 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-start gap-2 cursor-pointer">
            <div className="flex-1">
              <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                Waist-to-Height Ratio
                <Info className="h-4 w-4 text-mint-500" />
              </div>
              <div className={`text-2xl font-semibold ${getTextColor(value)}`}>
                {value.toFixed(3)}
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-2">
            <h4 className="font-semibold">Waist-to-Height Ratio (WHtR)</h4>
            <p>A simple and effective screening tool for cardiovascular health risk and central obesity.</p>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">WHtR = Waist Circumference / Height</p>
              </div>
              <div>
                <p className="font-medium">Ranges:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Below 0.4: Very Low - may indicate insufficient body mass</li>
                  <li>0.4-0.5: Healthy - optimal range for health outcomes</li>
                  <li>0.5-0.6: Overweight - increased health risks</li>
                  <li>Above 0.6: Obese - significantly elevated health risks</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WaistHeightCard;