import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import * as healthCalc from "@/utils/healthCalculations";
import HealthResults from "./HealthResults";

interface HealthMetrics {
  height: string;
  weight: string;
  age: string;
  gender: 'male' | 'female' | '';
  neck: string;
  waist: string;
  hip: string;
  wrist: string;
  forearm: string;
  triceps: string;
  subscapular: string;
  suprailiac: string;
  abdominal: string;
  thigh: string;
  chest: string;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive' | '';
  unit: 'metric' | 'imperial';
}

const initialMetrics: HealthMetrics = {
  height: "",
  weight: "",
  age: "",
  gender: "",
  neck: "",
  waist: "",
  hip: "",
  wrist: "",
  forearm: "",
  triceps: "",
  subscapular: "",
  suprailiac: "",
  abdominal: "",
  thigh: "",
  chest: "",
  activityLevel: "",
  unit: "metric"
};

const HealthCalculator = () => {
  const [metrics, setMetrics] = useState<HealthMetrics>(initialMetrics);
  const [results, setResults] = useState<any>(null);

  const handleMetricChange = (key: keyof HealthMetrics, value: string) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
    calculateResults({ ...metrics, [key]: value });
  };

  const calculateResults = (currentMetrics: HealthMetrics) => {
    const numericMetrics: any = {};
    Object.entries(currentMetrics).forEach(([key, value]) => {
      if (key !== 'unit' && key !== 'gender' && key !== 'activityLevel') {
        numericMetrics[key] = value ? parseFloat(value) : undefined;
      } else {
        numericMetrics[key] = value;
      }
    });

    const results: any = {};

    // Convert imperial to metric if needed
    if (currentMetrics.unit === 'imperial') {
      if (numericMetrics.height) numericMetrics.height *= 2.54;
      if (numericMetrics.weight) numericMetrics.weight *= 0.453592;
      if (numericMetrics.neck) numericMetrics.neck *= 2.54;
      if (numericMetrics.waist) numericMetrics.waist *= 2.54;
      if (numericMetrics.hip) numericMetrics.hip *= 2.54;
      if (numericMetrics.wrist) numericMetrics.wrist *= 2.54;
    }

    // Calculate all available metrics
    if (numericMetrics.height && numericMetrics.weight) {
      results.bmi = healthCalc.calculateBMI(numericMetrics.height, numericMetrics.weight);
    }

    if (numericMetrics.gender) {
      results.bodyFat = healthCalc.calculateBodyFat(numericMetrics);
      results.idealWeight = healthCalc.calculateIdealWeight(numericMetrics.height, numericMetrics.gender);
    }

    results.bmr = healthCalc.calculateBMR(numericMetrics);
    results.frameSize = healthCalc.calculateFrameSize(numericMetrics);
    results.waistToHip = healthCalc.calculateWaistToHip(numericMetrics);
    results.biologicalAge = healthCalc.calculateBiologicalAge(numericMetrics);

    setResults(results);
  };

  const renderTooltip = (content: string) => (
    <Tooltip>
      <TooltipTrigger>
        <Info className="h-4 w-4 ml-1 text-mint-500" />
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  );

  const renderMetricInput = (
    label: string,
    key: keyof HealthMetrics,
    tooltip: string,
    placeholder: string
  ) => (
    <div className="space-y-2">
      <div className="flex items-center">
        <Label htmlFor={key}>
          {label} ({metrics.unit === "metric" ? "cm" : "in"})
        </Label>
        {renderTooltip(tooltip)}
      </div>
      <Input
        id={key}
        type="number"
        value={metrics[key]}
        onChange={(e) => handleMetricChange(key, e.target.value)}
        placeholder={placeholder}
        className="transition-all duration-200 focus:ring-mint-500"
      />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in">
      <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-lg">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-mint-800">Health Calculator</h1>
            <p className="text-gray-600">Calculate various health metrics based on your measurements</p>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="unit">Unit System</Label>
                <Select
                  value={metrics.unit}
                  onValueChange={(value: 'metric' | 'imperial') => handleMetricChange('unit', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric (cm/kg)</SelectItem>
                    <SelectItem value="imperial">Imperial (in/lbs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={metrics.gender}
                  onValueChange={(value: 'male' | 'female') => handleMetricChange('gender', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {renderMetricInput("Height", "height", "Your standing height", "175")}
              {renderMetricInput("Weight", "weight", "Your current weight", "70")}
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  value={metrics.age}
                  onChange={(e) => handleMetricChange('age', e.target.value)}
                  placeholder="25"
                  className="transition-all duration-200 focus:ring-mint-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-mint-800">Body Measurements</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {renderMetricInput("Neck", "neck", "Measure around the middle of your neck", "35")}
                {renderMetricInput("Waist", "waist", "Measure at navel level", "80")}
                {renderMetricInput("Hip", "hip", "Measure at the widest point", "95")}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-mint-800">Additional Measurements</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {renderMetricInput("Wrist", "wrist", "Measure around your wrist", "16")}
                {renderMetricInput("Forearm", "forearm", "Measure at the widest point", "25")}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-mint-800">Skinfold Measurements (mm)</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {renderMetricInput("Triceps", "triceps", "Back of upper arm", "15")}
                {renderMetricInput("Subscapular", "subscapular", "Below shoulder blade", "17")}
                {renderMetricInput("Suprailiac", "suprailiac", "Above hip bone", "18")}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {renderMetricInput("Abdominal", "abdominal", "Next to navel", "20")}
                {renderMetricInput("Thigh", "thigh", "Front of thigh", "25")}
                {renderMetricInput("Chest", "chest", "Diagonal fold", "15")}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select
                value={metrics.activityLevel}
                onValueChange={(value: HealthMetrics['activityLevel']) => 
                  handleMetricChange('activityLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Light (exercise 1-3 times/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (exercise 4-5 times/week)</SelectItem>
                  <SelectItem value="active">Active (daily exercise)</SelectItem>
                  <SelectItem value="veryActive">Very Active (intense daily exercise)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {results && <HealthResults results={results} />}
        </div>
      </Card>
    </div>
  );
};

export default HealthCalculator;
