import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface MetabolicResultsProps {
  bmr: {
    bmr: number;
    tdee?: number;
  };
}

const MetabolicResults = ({ bmr }: MetabolicResultsProps) => {
  const getBMRColor = (value: number) => {
    if (value < 1200) return "text-blue-600";
    if (value < 1800) return "text-green-600";
    if (value < 2200) return "text-yellow-600";
    return "text-red-600";
  };

  const getTDEEColor = (value: number) => {
    if (value < 1500) return "text-blue-600";
    if (value < 2500) return "text-green-600";
    if (value < 3000) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Metabolic Rates</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex-1">
                  <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                    BMR (calories/day)
                    <Info className="h-4 w-4 text-mint-500" />
                  </div>
                  <div className={`text-2xl font-semibold ${getBMRColor(bmr.bmr)}`}>
                    {Math.round(bmr.bmr)}
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="space-y-2">
                <h4 className="font-semibold">Basal Metabolic Rate (BMR)</h4>
                <p>The number of calories your body burns at rest to maintain basic life functions.</p>
                <div className="text-sm space-y-1">
                  <p className="font-medium">Method:</p>
                  <p>Uses the Mifflin-St Jeor Equation, considered the most accurate for most people.</p>
                  <p className="font-medium mt-2">Formula:</p>
                  <p className="text-mint-700">For men:</p>
                  <p className="text-mint-700">BMR = (10 × weight kg) + (6.25 × height cm) - (5 × age) + 5</p>
                  <p className="text-mint-700">For women:</p>
                  <p className="text-mint-700">BMR = (10 × weight kg) + (6.25 × height cm) - (5 × age) - 161</p>
                  <p className="font-medium mt-2">Ranges:</p>
                  <ul className="list-disc pl-4">
                    <li>Low: &lt;1200 calories</li>
                    <li>Normal: 1200-1800 calories</li>
                    <li>High: 1800-2200 calories</li>
                    <li>Very High: &gt;2200 calories</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {bmr.tdee && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="flex-1">
                    <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                      TDEE (calories/day)
                      <Info className="h-4 w-4 text-mint-500" />
                    </div>
                    <div className={`text-2xl font-semibold ${getTDEEColor(bmr.tdee)}`}>
                      {Math.round(bmr.tdee)}
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="space-y-2">
                  <h4 className="font-semibold">Total Daily Energy Expenditure (TDEE)</h4>
                  <p>The total number of calories you burn in a day, including activity.</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Method:</p>
                    <p>Calculated by multiplying BMR by an activity factor based on your daily activity level.</p>
                    <p className="font-medium mt-2">Formula:</p>
                    <p className="text-mint-700">TDEE = BMR × Activity Multiplier</p>
                    <p className="font-medium mt-2">Activity Multipliers:</p>
                    <ul className="list-disc pl-4">
                      <li>Sedentary: 1.2</li>
                      <li>Light Activity: 1.375</li>
                      <li>Moderate Activity: 1.55</li>
                      <li>Very Active: 1.725</li>
                      <li>Extra Active: 1.9</li>
                    </ul>
                    <p className="font-medium mt-2">Ranges:</p>
                    <ul className="list-disc pl-4">
                      <li>Low: &lt;1500 calories</li>
                      <li>Normal: 1500-2500 calories</li>
                      <li>High: 2500-3000 calories</li>
                      <li>Very High: &gt;3000 calories</li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetabolicResults;