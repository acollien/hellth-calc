import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react";

interface IdealWeightResultsProps {
  idealWeight: {
    robinson: number;
    miller: number;
    devine: number;
    athletic: number;
    bmiBased: number;
  };
}

const IdealWeightResults = ({ idealWeight }: IdealWeightResultsProps) => {
  const getValueColor = (value: number) => {
    if (value < 45) return "text-blue-600";
    if (value < 55) return "text-green-600";
    if (value < 75) return "text-mint-600";
    if (value < 85) return "text-yellow-600";
    return "text-red-600";
  };

  const citations = {
    robinson: {
      text: "View Original Robinson Formula Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/3826798/"
    },
    miller: {
      text: "View Original Miller Formula Research",
      url: "https://pubmed.ncbi.nlm.nih.gov/3520910/"
    },
    devine: {
      text: "View Original Devine Formula Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/4881690/"
    },
    athletic: {
      text: "View Athletic Body Composition Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/15809561/"
    },
    bmiBased: {
      text: "View BMI-Based Weight Analysis",
      url: "https://pubmed.ncbi.nlm.nih.gov/17241369/"
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Ideal Weight Range (kg)</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {Object.entries(idealWeight).map(([formula, value]) => (
          <div key={formula} className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="flex-1">
                    <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                      {formula.charAt(0).toUpperCase() + formula.slice(1)} Formula
                      <Info className="h-4 w-4 text-mint-500" />
                    </div>
                    <div className={`text-2xl font-semibold ${getValueColor(value)}`}>
                      {value.toFixed(1)}
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="space-y-2">
                  <h4 className="font-semibold">{formula.charAt(0).toUpperCase() + formula.slice(1)} Formula</h4>
                  <p>{getFormulaDescription(formula)}</p>
                  <div className="text-sm space-y-2">
                    <div>
                      <p className="font-medium">Formula:</p>
                      <p className="text-mint-700">{getFormula(formula)}</p>
                    </div>
                    <div>
                      <p className="font-medium">Interpretation:</p>
                      <ul className="list-disc pl-4">
                        <li>&lt;45 kg: Very Low Weight Range</li>
                        <li>45-54 kg: Low Normal Weight Range</li>
                        <li>55-74 kg: Normal Weight Range</li>
                        <li>75-84 kg: High Normal Weight Range</li>
                        <li>&gt;85 kg: High Weight Range</li>
                      </ul>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      <p className="font-medium">Citation:</p>
                      <a 
                        href={citations[formula as keyof typeof citations].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {citations[formula as keyof typeof citations].text}
                      </a>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

const getFormulaDescription = (formula: string) => {
  switch (formula) {
    case 'robinson':
      return 'The Robinson formula (1983) is widely used in medical settings and provides a conservative estimate based on height and gender.';
    case 'miller':
      return 'The Miller formula (1983) tends to give lower estimates and may be more suitable for lean builds, considering frame size.';
    case 'devine':
      return 'The Devine formula (1974) is commonly used in clinical settings and provides a middle-ground estimate based on height and gender.';
    case 'athletic':
      return 'A modified formula optimized for athletic body types, accounting for higher muscle mass and bone density.';
    case 'bmiBased':
      return 'Calculation based on healthy BMI range (18.5-24.9), providing a general reference point for ideal weight.';
    default:
      return '';
  }
};

const getFormula = (formula: string) => {
  switch (formula) {
    case 'robinson':
      return 'Men: 52 + 1.9 × (height in inches - 60)\nWomen: 49 + 1.7 × (height in inches - 60)';
    case 'miller':
      return 'Men: 56.2 + 1.41 × (height in inches - 60)\nWomen: 53.1 + 1.36 × (height in inches - 60)';
    case 'devine':
      return 'Men: 50 + 2.3 × (height in inches - 60)\nWomen: 45.5 + 2.3 × (height in inches - 60)';
    case 'athletic':
      return 'Standard ideal weight × 1.1';
    case 'bmiBased':
      return 'Height² × target BMI (21.7)';
    default:
      return '';
  }
};

export default IdealWeightResults;