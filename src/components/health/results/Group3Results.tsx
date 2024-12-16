import LeanMassIndexCard from "./cards/LeanMassIndexCard";
import BodyAdiposityCard from "./cards/BodyAdiposityCard";
import ConicityCard from "./cards/ConicityCard";

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
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Advanced Body Measurements</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {typeof leanMassIndex === 'number' && !isNaN(leanMassIndex) && (
          <LeanMassIndexCard value={leanMassIndex} />
        )}
        {typeof bodyAdiposityIndex === 'number' && !isNaN(bodyAdiposityIndex) && (
          <BodyAdiposityCard value={bodyAdiposityIndex} />
        )}
        {typeof conicityIndex === 'number' && !isNaN(conicityIndex) && (
          <ConicityCard value={conicityIndex} />
        )}
      </div>
    </div>
  );
};

export default Group3Results;