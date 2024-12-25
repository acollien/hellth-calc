import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
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
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-2">
            <h4 className="font-semibold">Body Frame Size</h4>
            <p>A measure of skeletal mass that helps determine your basic body type and optimal weight range based on wrist circumference and height.</p>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Method:</p>
                <p className="text-mint-700">Frame Size Index = Height (cm) / Wrist Circumference (cm)</p>
              </div>
              <div>
                <p className="font-medium">Categories:</p>
                <ul className="list-disc pl-4">
                  <li>Small Frame: Height/Wrist &gt; 10.4</li>
                  <li>Medium Frame: Height/Wrist 9.6 - 10.4</li>
                  <li>Large Frame: Height/Wrist &lt; 9.6</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                <ul className="list-disc pl-4">
                  <li>Small: Lighter bone structure, may need lower weight targets</li>
                  <li>Medium: Average bone structure, standard weight targets apply</li>
                  <li>Large: Heavier bone structure, may need higher weight targets</li>
                </ul>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <p className="font-medium">Citation:</p>
                <a 
                  href="https://pubmed.ncbi.nlm.nih.gov/7900416/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Body Frame Size Research Study
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FrameSizeCard;