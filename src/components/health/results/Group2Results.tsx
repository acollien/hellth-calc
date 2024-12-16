import FatFreeMassCard from "./cards/FatFreeMassCard";
import LeanBodyMassCard from "./cards/LeanBodyMassCard";
import SkeletalMuscleMassCard from "./cards/SkeletalMuscleMassCard";
import BodyFatDistributionCard from "./cards/BodyFatDistributionCard";
import FrameSizeCard from "./cards/FrameSizeCard";
import GroupResults from "./GroupResults";

interface Group2ResultsProps {
  leanBodyMass?: number;
  fatFreeMassIndex?: number;
  skeletalMuscleMass?: number;
  bodyFatDistribution?: number;
  frameSize: string | null;
  unit: 'metric' | 'imperial';
}

const Group2Results = ({ 
  leanBodyMass, 
  fatFreeMassIndex, 
  skeletalMuscleMass, 
  bodyFatDistribution,
  frameSize,
  unit 
}: Group2ResultsProps) => {
  console.log("Group2Results received values:", {
    leanBodyMass,
    fatFreeMassIndex,
    skeletalMuscleMass,
    bodyFatDistribution,
    frameSize
  });

  // Check if we have at least one valid value
  const hasAnyValidValues = 
    (typeof leanBodyMass === 'number' && !isNaN(leanBodyMass)) ||
    (typeof fatFreeMassIndex === 'number' && !isNaN(fatFreeMassIndex)) ||
    (typeof skeletalMuscleMass === 'number' && !isNaN(skeletalMuscleMass)) ||
    (typeof bodyFatDistribution === 'number' && !isNaN(bodyFatDistribution)) ||
    (frameSize && typeof frameSize === 'string');

  if (!hasAnyValidValues) {
    console.log("No valid values present in Group2Results, not rendering");
    return null;
  }

  return (
    <GroupResults 
      title="Body Composition"
      description="Detailed breakdown of your body's structural and mass components."
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
      {frameSize && <FrameSizeCard frameSize={frameSize} />}
    </GroupResults>
  );
};

export default Group2Results;