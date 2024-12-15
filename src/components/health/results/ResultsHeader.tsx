import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportResults } from "@/utils/exportUtils";

interface ResultsHeaderProps {
  results: any;
}

const ResultsHeader = ({ results }: ResultsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-mint-900">Your Results</h2>
      <Button
        onClick={() => exportResults(results, 'pdf')}
        variant="outline"
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Export Results
      </Button>
    </div>
  );
};

export default ResultsHeader;