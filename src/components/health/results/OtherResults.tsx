import FrameSizeCard from "./cards/FrameSizeCard";
import WaistToHipCard from "./cards/WaistToHipCard";

interface OtherResultsProps {
  frameSize: string | null;
  waistToHip?: number;
}

const OtherResults = ({ frameSize, waistToHip }: OtherResultsProps) => {
  console.log("OtherResults received frameSize:", frameSize);
  
  // Only render if we have valid data to show
  if (!frameSize && !waistToHip) {
    console.log("No data to display in OtherResults");
    return null;
  }

  const shouldShowFrameSize = frameSize && 
    frameSize !== 'undefined' && 
    frameSize !== 'null' && 
    ['small', 'medium', 'large'].includes(frameSize.toLowerCase());

  console.log("Should show frame size:", shouldShowFrameSize, "with value:", frameSize);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {shouldShowFrameSize && <FrameSizeCard frameSize={frameSize} />}
      {waistToHip && <WaistToHipCard value={waistToHip} />}
    </div>
  );
};

export default OtherResults;