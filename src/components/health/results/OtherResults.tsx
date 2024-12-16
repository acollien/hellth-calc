import FrameSizeCard from "./cards/FrameSizeCard";
import WaistToHipCard from "./cards/WaistToHipCard";

interface OtherResultsProps {
  frameSize: string | null;
  waistToHip?: number;
  unit: 'metric' | 'imperial';  // Added unit to props interface
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
    <div className="grid gap-4 sm:grid-cols-2">
      {isValidFrameSize && <FrameSizeCard frameSize={frameSize} />}
      {waistToHip && <WaistToHipCard value={waistToHip} />}
    </div>
  );
};

export default OtherResults;