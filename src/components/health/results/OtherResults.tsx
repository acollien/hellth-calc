import FrameSizeCard from "./cards/FrameSizeCard";
import WaistToHipCard from "./cards/WaistToHipCard";

interface OtherResultsProps {
  frameSize: string | null;
  waistToHip?: number;
}

const OtherResults = ({ frameSize, waistToHip }: OtherResultsProps) => {
  console.log("OtherResults received frameSize:", frameSize);
  
  // Only render if we have at least one value to show
  if (!frameSize && !waistToHip) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {frameSize && frameSize !== 'undefined' && <FrameSizeCard frameSize={frameSize} />}
      {waistToHip && <WaistToHipCard value={waistToHip} />}
    </div>
  );
};

export default OtherResults;