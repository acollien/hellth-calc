import LeanMassIndexCard from "./cards/LeanMassIndexCard";
import BodyAdiposityCard from "./cards/BodyAdiposityCard";
import ConicityCard from "./cards/ConicityCard";
import GroupResults from "./GroupResults";

interface Group3ResultsProps {
  leanMassIndex?: number | null;
  bodyAdiposityIndex?: number | null;
  conicityIndex?: number | null;
  unit: 'metric' | 'imperial';
}

const Group3Results = ({ 
  leanMassIndex, 
  bodyAdiposityIndex, 
  conicityIndex,
  unit 
}: Group3ResultsProps) => {
  console.log("Group3Results received values:", {
    leanMassIndex,
    bodyAdiposityIndex,
    conicityIndex
  });
  
  // Check if we have valid numbers for any of the indices
  const hasValidValues = (
    (typeof leanMassIndex === 'number' && !isNaN(leanMassIndex)) ||
    (typeof bodyAdiposityIndex === 'number' && !isNaN(bodyAdiposityIndex)) ||
    (typeof conicityIndex === 'number' && !isNaN(conicityIndex))
  );

  if (!hasValidValues) {
    console.log("No valid values present in Group3Results, not rendering");
    return null;
  }

  return (
    <GroupResults 
      title="Advanced Body Measurements"
      description="Advanced measurements that provide detailed insights about your body composition and health risks."
    >
      {typeof leanMassIndex === 'number' && !isNaN(leanMassIndex) && (
        <LeanMassIndexCard value={leanMassIndex} />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-2">
        {typeof bodyAdiposityIndex === 'number' && !isNaN(bodyAdiposityIndex) && (
          <BodyAdiposityCard value={bodyAdiposityIndex} />
        )}
        {typeof conicityIndex === 'number' && !isNaN(conicityIndex) && (
          <ConicityCard value={conicityIndex} />
        )}
      </div>
    </GroupResults>
  );
};

export default Group3Results;