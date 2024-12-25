import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface LeanMassIndexCardProps {
  value: number | null;
}

const LeanMassIndexCard = ({ value }: LeanMassIndexCardProps) => {
  console.log('LeanMassIndexCard rendering with value:', value);

  if (!value || isNaN(value)) {
    console.log('Invalid LeanMassIndex value, not rendering card');
    return null;
  }

  const getColor = (val: number) => {
    if (val < 16) return "text-blue-600";
    if (val < 19) return "text-green-600";
    if (val < 22) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex-1">
              <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                Lean Mass Index
                <Info className="h-4 w-4 text-mint-500" />
              </div>
              <div className={`text-2xl font-semibold ${getColor(value)}`}>
                {value.toFixed(1)}
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-2">
            <h4 className="font-semibold">Lean Mass Index (LMI)</h4>
            <p>A measure that assesses lean body mass relative to height, providing insight into muscle mass distribution independent of body fat.</p>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">LMI = Lean Mass / Height²</p>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                <ul className="list-disc pl-4">
                  <li>&lt;16: Low muscle mass - May indicate insufficient muscle tissue</li>
                  <li>16-19: Normal muscle mass - Healthy range for general population</li>
                  <li>19-22: Athletic muscle mass - Common in physically active individuals</li>
                  <li>&gt;22: Exceptional muscle mass - Typical in strength athletes</li>
                </ul>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <p className="font-medium">Citation:</p>
                <a 
                  href="https://pubmed.ncbi.nlm.nih.gov/15543150/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Lean Mass Index Research Study
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeanMassIndexCard;