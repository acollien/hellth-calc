import FrameSizeCard from "./cards/FrameSizeCard";
import WaistToHipCard from "./cards/WaistToHipCard";

interface OtherResultsProps {
  frameSize: string | null;
  waistToHip: number | undefined;
  unit: 'metric' | 'imperial';
}

const OtherResults = ({ frameSize, waistToHip, unit }: OtherResultsProps) => {
  console.log("OtherResults received frameSize:", frameSize);
  
  // Only render if we have valid data to show
  if (!frameSize && !waistToHip) {
    console.log("No data to display in OtherResults");
    return null;
  }

  const isValidFrameSize = frameSize && 
    typeof frameSize === 'string' &&
    frameSize !== 'undefined' && 
    frameSize !== 'null' && 
    ['small', 'medium', 'large'].includes(frameSize.toLowerCase());

  console.log("Is valid frame size:", isValidFrameSize, "with value:", frameSize);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Other Measurements</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {isValidFrameSize && <FrameSizeCard frameSize={frameSize} />}
        {waistToHip && <WaistToHipCard value={waistToHip} />}
      </div>
    </div>
  );
};

export default OtherResults;