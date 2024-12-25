import MetabolicCard from "./cards/MetabolicCard";

interface MetabolicResultsProps {
  bmr: {
    bmr: number;
    tdee?: number;
  };
}

const MetabolicResults = ({ bmr }: MetabolicResultsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Metabolic Rates</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <MetabolicCard value={bmr.bmr} type="bmr" />
        {bmr.tdee && <MetabolicCard value={bmr.tdee} type="tdee" />}
      </div>
    </div>
  );
};

export default MetabolicResults;