import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface BiologicalAgeResultsProps {
  biologicalAge: number;
}

const BiologicalAgeResults = ({ biologicalAge }: BiologicalAgeResultsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Biological Age Estimation</h3>
      <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="flex-1">
                <span className="text-sm text-mint-800 font-medium flex items-center gap-2">
                  Estimated Biological Age
                  <Info className="h-4 w-4 text-mint-500" />
                </span>
                <div className="text-2xl font-semibold text-mint-900">
                  {biologicalAge} years
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div className="space-y-2">
              <h4 className="font-semibold">Biological Age</h4>
              <p>An estimate of your body's physiological age based on various health metrics and biomarkers.</p>
              <div className="text-sm space-y-2">
                <div>
                  <p className="font-medium">Formula:</p>
                  <p className="text-mint-700">
                    Base = Chronological Age<br />
                    Adjustments:<br />
                    - BMI {'>'}25: +0.5 years per unit above<br />
                    - BMI {'<'}18.5: +0.5 years per unit below<br />
                    - WHR {'>'}0.9 (men) or {'>'}0.85 (women): +10 years per 0.1 above
                  </p>
                </div>
                <div>
                  <p className="font-medium">Factors Considered:</p>
                  <ul className="list-disc pl-4">
                    <li>BMI and weight distribution</li>
                    <li>Body composition metrics</li>
                    <li>Waist-to-height ratio</li>
                    <li>Physical measurements</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Interpretation:</p>
                  <ul className="list-disc pl-4">
                    <li>Lower than chronological age: Better health status</li>
                    <li>Equal to chronological age: Average health status</li>
                    <li>Higher than chronological age: Health improvements recommended</li>
                  </ul>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  <p className="font-medium">Citation:</p>
                  <a 
                    href="https://pubmed.ncbi.nlm.nih.gov/25104406/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Biological Age Assessment Study
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BiologicalAgeResults;