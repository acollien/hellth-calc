import AbsiCard from "./cards/AbsiCard";
import BodyRoundnessCard from "./cards/BodyRoundnessCard";
import PonderalIndexCard from "./cards/PonderalIndexCard";
import WaistHeightCard from "./cards/WaistHeightCard";
import WaistToHipCard from "./cards/WaistToHipCard";
import GroupResults from "./GroupResults";

interface Group1ResultsProps {
  ponderalIndex: { metric: number; imperial: number } | null;
  absi: { metric: number; imperial: number } | null;
  bodyRoundnessIndex: { metric: number; imperial: number } | null;
  waistToHeightRatio: number | null;
  waistToHip: number | null;
  unit: 'metric' | 'imperial';
}

const Group1Results = ({ 
  ponderalIndex, 
  absi, 
  bodyRoundnessIndex, 
  waistToHeightRatio,
  waistToHip,
  unit 
}: Group1ResultsProps) => {
  return (
    <GroupResults 
      title="Body Shape Indices"
      description="Measurements that evaluate your body's shape, proportions, and fat distribution patterns."
    >
      {ponderalIndex && <PonderalIndexCard value={ponderalIndex} unit={unit} />}
      {absi && <AbsiCard value={absi} unit={unit} />}
      {bodyRoundnessIndex && <BodyRoundnessCard value={bodyRoundnessIndex} unit={unit} />}
      {waistToHeightRatio && <WaistHeightCard value={waistToHeightRatio} />}
      {waistToHip && <WaistToHipCard value={waistToHip} />}
    </GroupResults>
  );
};

export default Group1Results;