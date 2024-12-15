import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Header = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-xs self-start">
            Legal Information
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Legal Information</DialogTitle>
            <DialogDescription className="space-y-4">
              <p>This application ("Hellth") is provided for informational purposes only and should not be considered medical advice. Always consult with healthcare professionals for medical decisions.</p>
              
              <h4 className="font-semibold">Data Privacy</h4>
              <p>We do not collect, store, or sell any personal information. All calculations are performed locally in your browser.</p>
              
              <h4 className="font-semibold">Cookies</h4>
              <p>This application does not use cookies or tracking mechanisms.</p>
              
              <h4 className="font-semibold">Disclaimer</h4>
              <p>The calculations and results provided are based on general formulas and may not account for individual variations or specific medical conditions. Use at your own discretion.</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-mint-800">Hellth Calculator</h1>
        <p className="text-gray-600">Calculate various health metrics based on your measurements</p>
      </div>
    </div>
  );
};

export default Header;