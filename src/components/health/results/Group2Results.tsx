import FatFreeMassCard from "./cards/FatFreeMassCard";
import LeanBodyMassCard from "./cards/LeanBodyMassCard";
import SkeletalMuscleMassCard from "./cards/SkeletalMuscleMassCard";
import BodyFatDistributionCard from "./cards/BodyFatDistributionCard";
import GroupResults from "./GroupResults";

interface Group2ResultsProps {
  leanBodyMass?: number;
  fatFreeMassIndex?: number;
  skeletalMuscleMass?: number;
  bodyFatDistribution?: number;
  unit: 'metric' | 'imperial';
}

const Group2Results = ({ 
  leanBodyMass, 
  fatFreeMassIndex, 
  skeletalMuscleMass, 
  bodyFatDistribution,
  unit 
}: Group2ResultsProps) => {
  console.log("Group2Results received values:", {
    leanBodyMass,
    fatFreeMassIndex,
    skeletalMuscleMass,
    bodyFatDistribution
  });

  // Check if we have at least one valid value
  const hasAnyValidValues = 
    (typeof leanBodyMass === 'number' && !isNaN(leanBodyMass)) ||
    (typeof fatFreeMassIndex === 'number' && !isNaN(fatFreeMassIndex)) ||
    (typeof skeletalMuscleMass === 'number' && !isNaN(skeletalMuscleMass)) ||
    (typeof bodyFatDistribution === 'number' && !isNaN(bodyFatDistribution));

  if (!hasAnyValidValues) {
    console.log("No valid values present in Group2Results, not rendering");
    return null;
  }

  return (
    <GroupResults 
      title="Mass and Composition"
      description="Detailed breakdown of your body's mass components and their distribution."
    >
      {typeof leanBodyMass === 'number' && !isNaN(leanBodyMass) && (
        <LeanBodyMassCard value={leanBodyMass} unit={unit} />
      )}
      {typeof fatFreeMassIndex === 'number' && !isNaN(fatFreeMassIndex) && (
        <FatFreeMassCard value={fatFreeMassIndex} />
      )}
      {typeof skeletalMuscleMass === 'number' && !isNaN(skeletalMuscleMass) && (
        <SkeletalMuscleMassCard value={skeletalMuscleMass} unit={unit} />
      )}
      {typeof bodyFatDistribution === 'number' && !isNaN(bodyFatDistribution) && (
        <BodyFatDistributionCard value={bodyFatDistribution} />
      )}
    </GroupResults>
  );
};

export default Group2Results;