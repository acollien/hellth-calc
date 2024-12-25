import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface AbsiCardProps {
  value: { metric: number; imperial: number };
  unit: 'metric' | 'imperial';
}

const AbsiCard = ({ value, unit }: AbsiCardProps) => {
  const getValueColor = (value: number) => {
    if (value < 0.07) return "text-green-600";
    if (value < 0.08) return "text-yellow-600";
    return "text-red-600";
  };

  const interpretation = (
    <ul className="list-disc pl-4">
      <li>Below 0.07: Low health risk</li>
      <li>0.07-0.08: Average health risk</li>
      <li>Above 0.08: Elevated health risk</li>
    </ul>
  );

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-mint-800 font-medium">A Body Shape Index</span>
            <Info className="h-4 w-4 text-mint-500" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-2">
            <h4 className="font-semibold">A Body Shape Index (ABSI)</h4>
            <p>A measure that evaluates body shape independent of height and weight, focusing on the health implications of central obesity.</p>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">ABSI = WC / (BMI^(2/3) × Height^(1/2))</p>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                {interpretation}
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <p className="font-medium">Citation:</p>
                <a 
                  href="https://doi.org/10.1371/journal.pone.0039504"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Krakauer NY, Krakauer JC. A new body shape index predicts mortality hazard independently of body mass index. PLoS One. 2012;7(7):e39504.
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className={`text-2xl font-semibold ${getValueColor(value[unit])}`}>
        {value[unit].toFixed(3)}
      </div>
    </div>
  );
};

export default AbsiCard;