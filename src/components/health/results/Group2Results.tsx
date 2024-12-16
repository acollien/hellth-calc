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
  const hasAnyResults = leanBodyMass || fatFreeMassIndex || skeletalMuscleMass || bodyFatDistribution;
  
  if (!hasAnyResults) return null;

  return (
    <GroupResults 
      title="Mass and Composition"
      description="Detailed breakdown of your body's mass components and their distribution."
    >
      {leanBodyMass && <LeanBodyMassCard value={leanBodyMass} unit={unit} />}
      {fatFreeMassIndex && <FatFreeMassCard value={fatFreeMassIndex} />}
      {skeletalMuscleMass && <SkeletalMuscleMassCard value={skeletalMuscleMass} unit={unit} />}
      {bodyFatDistribution && <BodyFatDistributionCard value={bodyFatDistribution} />}
    </GroupResults>
  );
};

export default Group2Results;