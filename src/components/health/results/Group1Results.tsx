import PonderalIndexCard from "./cards/PonderalIndexCard";
import AbsiCard from "./cards/AbsiCard";
import BodyRoundnessCard from "./cards/BodyRoundnessCard";
import WaistHeightCard from "./cards/WaistHeightCard";

interface Group1ResultsProps {
  ponderalIndex: { metric: number; imperial: number } | null;
  absi: { metric: number; imperial: number } | null;
  bodyRoundnessIndex: { metric: number; imperial: number } | null;
  waistToHeightRatio: number | null;
  unit: 'metric' | 'imperial';
}

const Group1Results = ({ 
  ponderalIndex, 
  absi, 
  bodyRoundnessIndex, 
  waistToHeightRatio, 
  unit 
}: Group1ResultsProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-lg font-medium text-mint-800">Body Indices</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ponderalIndex && <PonderalIndexCard value={ponderalIndex} unit={unit} />}
        {absi && <AbsiCard value={absi} unit={unit} />}
        {bodyRoundnessIndex && <BodyRoundnessCard value={bodyRoundnessIndex} unit={unit} />}
        {waistToHeightRatio && <WaistHeightCard value={waistToHeightRatio} />}
      </div>
    </div>
  );
};

export default Group1Results;