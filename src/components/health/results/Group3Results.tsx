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

  // Individual validity checks for each metric
  const hasValidLeanMassIndex = typeof leanMassIndex === 'number' && !isNaN(leanMassIndex);
  const hasValidBodyAdiposityIndex = typeof bodyAdiposityIndex === 'number' && !isNaN(bodyAdiposityIndex);
  const hasValidConicityIndex = typeof conicityIndex === 'number' && !isNaN(conicityIndex);

  // Check if we have at least one valid value
  const hasAnyValidValues = hasValidLeanMassIndex || hasValidBodyAdiposityIndex || hasValidConicityIndex;

  if (!hasAnyValidValues) {
    console.log("No valid values present in Group3Results, not rendering");
    return null;
  }

  return (
    <GroupResults 
      title="Advanced Body Measurements"
      description="Advanced measurements that provide detailed insights about your body composition and health risks."
    >
      {hasValidLeanMassIndex && (
        <LeanMassIndexCard value={leanMassIndex} />
      )}
      {hasValidBodyAdiposityIndex && (
        <BodyAdiposityCard value={bodyAdiposityIndex} />
      )}
      {hasValidConicityIndex && (
        <ConicityCard value={conicityIndex} />
      )}
    </GroupResults>
  );
};

export default Group3Results;