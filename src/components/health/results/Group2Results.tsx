import LeanBodyMassCard from "./cards/LeanBodyMassCard";
import FatFreeMassCard from "./cards/FatFreeMassCard";
import SkeletalMuscleMassCard from "./cards/SkeletalMuscleMassCard";
import BodyFatDistributionCard from "./cards/BodyFatDistributionCard";

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
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-mint-800">Mass and Composition</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {leanBodyMass && <LeanBodyMassCard value={leanBodyMass} unit={unit} />}
        {fatFreeMassIndex && <FatFreeMassCard value={fatFreeMassIndex} />}
        {skeletalMuscleMass && <SkeletalMuscleMassCard value={skeletalMuscleMass} unit={unit} />}
        {bodyFatDistribution && <BodyFatDistributionCard value={bodyFatDistribution} />}
      </div>
    </div>
  );
};

export default Group2Results;