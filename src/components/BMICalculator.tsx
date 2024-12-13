import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BMIResult {
  standard: number;
  devine: number;
  athletic: number;
  category: string;
}

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [results, setResults] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w)) return;

    let heightInM = unit === "metric" ? h / 100 : (h * 2.54) / 100;
    let weightInKg = unit === "metric" ? w : w * 0.453592;

    // Standard BMI
    const standardBMI = weightInKg / (heightInM * heightInM);

    // Devine Formula (adjusted BMI)
    const devineIdealWeight = unit === "metric" 
      ? 45.5 + 2.3 * ((heightInM * 100) / 2.54 - 60)
      : 45.5 + 2.3 * (h - 60);
    const devineBMI = (weightInKg / devineIdealWeight) * 21.7;

    // Athletic BMI (adjusted for muscle mass)
    const athleticBMI = standardBMI * 0.9;

    const getCategory = (bmi: number) => {
      if (bmi < 18.5) return "Underweight";
      if (bmi < 24.9) return "Normal weight";
      if (bmi < 29.9) return "Overweight";
      return "Obese";
    };

    setResults({
      standard: standardBMI,
      devine: devineBMI,
      athletic: athleticBMI,
      category: getCategory(standardBMI),
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 animate-fade-in">
      <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-lg">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-mint-800">BMI Calculator</h1>
            <p className="text-gray-600">Calculate your Body Mass Index using multiple methods</p>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="unit">Unit System</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select unit system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (cm/kg)</SelectItem>
                  <SelectItem value="imperial">Imperial (in/lbs)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="height">
                  Height ({unit === "metric" ? "cm" : "inches"})
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === "metric" ? "175" : "69"}
                  className="transition-all duration-200 focus:ring-mint-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">
                  Weight ({unit === "metric" ? "kg" : "lbs"})
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === "metric" ? "70" : "154"}
                  className="transition-all duration-200 focus:ring-mint-500"
                />
              </div>
            </div>

            <Button
              onClick={calculateBMI}
              className="w-full bg-mint-500 hover:bg-mint-600 text-white transition-all duration-200 animate-scale-in"
            >
              Calculate BMI
            </Button>
          </div>

          {results && (
            <div className="space-y-6 animate-fade-in">
              <div className="h-px bg-gray-200" />
              
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
                  <div className="text-sm text-mint-800 font-medium">Standard BMI</div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {results.standard.toFixed(1)}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
                  <div className="text-sm text-mint-800 font-medium">Devine Formula</div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {results.devine.toFixed(1)}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
                  <div className="text-sm text-mint-800 font-medium">Athletic BMI</div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {results.athletic.toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="text-center p-4 rounded-lg bg-mint-50 border border-mint-100">
                <div className="text-sm text-mint-800 font-medium">Category</div>
                <div className="text-xl font-semibold text-mint-900">
                  {results.category}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BMICalculator;