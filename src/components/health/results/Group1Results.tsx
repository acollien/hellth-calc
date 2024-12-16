import PonderalIndexCard from "./cards/PonderalIndexCard";
import AbsiCard from "./cards/AbsiCard";
import BodyRoundnessCard from "./cards/BodyRoundnessCard";
import WaistHeightCard from "./cards/WaistHeightCard";
import GroupResults from "./GroupResults";

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
    <GroupResults 
      title="Body Indices"
      description="Key measurements that provide insights into your body composition and health risks."
    >
      {ponderalIndex && <PonderalIndexCard value={ponderalIndex} unit={unit} />}
      {absi && <AbsiCard value={absi} unit={unit} />}
      {bodyRoundnessIndex && <BodyRoundnessCard value={bodyRoundnessIndex} unit={unit} />}
      {waistToHeightRatio && <WaistHeightCard value={waistToHeightRatio} />}
    </GroupResults>
  );
};

export default Group1Results;