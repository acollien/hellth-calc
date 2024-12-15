import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FrameSizeCardProps {
  frameSize: string;
}

const FrameSizeCard = ({ frameSize }: FrameSizeCardProps) => {
  console.log("FrameSizeCard rendering with frameSize:", frameSize);

  const getFrameSizeColor = (size: string): string => {
    const normalizedSize = size.toLowerCase();
    switch (normalizedSize) {
      case 'small': return "text-blue-600";
      case 'medium': return "text-green-600";
      case 'large': return "text-yellow-600";
      default: return "text-mint-900";
    }
  };

  const normalizedFrameSize = frameSize.toLowerCase();
  const color = getFrameSizeColor(normalizedFrameSize);
  
  console.log("Normalized frame size:", normalizedFrameSize, "with color:", color);

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                Body Frame Size
                <Info className="h-4 w-4 text-mint-500" />
              </div>
              <div className={`text-2xl font-semibold ${color} capitalize`}>
                {normalizedFrameSize}
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Body Frame Size</h4>
            <p>Determined by wrist circumference in relation to height.</p>
            <div className="text-sm space-y-1">
              <p className="font-medium">Method:</p>
              <p>Uses the height-to-wrist ratio to determine frame size.</p>
              <p className="font-medium mt-2">Formula:</p>
              <p className="text-mint-700">Frame Size Index = Height (cm) / Wrist Circumference (cm)</p>
              <p className="font-medium mt-2">Categories:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Small: Height/Wrist &gt; 10.4</li>
                <li>Medium: Height/Wrist 9.6 - 10.4</li>
                <li>Large: Height/Wrist &lt; 9.6</li>
              </ul>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FrameSizeCard;