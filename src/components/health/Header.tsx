import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Header = () => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-mint-800">Hellth Calculator</h1>
        <p className="text-gray-600">Calculate various health metrics based on your measurements</p>
      </div>
      
      <Alert variant="default" className="bg-mint-50 border-mint-200">
        <AlertCircle className="h-4 w-4 text-mint-500" />
        <AlertDescription className="text-sm text-mint-700">
          If tooltips aren't appearing when clicked, try disabling your ad blocker for this site.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Header;