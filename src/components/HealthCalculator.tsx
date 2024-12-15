import { useState } from "react";
import { Card } from "@/components/ui/card";
import * as healthCalc from "@/utils/healthCalculations";
import HealthResults from "./HealthResults";
import BasicMeasurements from "./health/BasicMeasurements";
import BodyMeasurements from "./health/BodyMeasurements";
import SkinFoldMeasurements from "./health/SkinFoldMeasurements";
import ActivityLevel from "./health/ActivityLevel";
import { HealthMetrics } from "./health/types";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

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
  chestSkinfold: "",
  midaxillarySkinfold: "",
  suprailiacSkinfold: "",
  thighSkinfold: "",
  umbilicalSkinfold: "",
  tricepsSkinfold: "",
  subscapularSkinfold: "",
  calfSkinfold: "",
  midaxillarySkinfold2: "",
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

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in">
      <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-lg">
        <div className="space-y-8">
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

          <div className="grid gap-6">
            <BasicMeasurements metrics={metrics} onMetricChange={handleMetricChange} />
            <BodyMeasurements metrics={metrics} onMetricChange={handleMetricChange} />
            <SkinFoldMeasurements metrics={metrics} onMetricChange={handleMetricChange} />
            <ActivityLevel metrics={metrics} onMetricChange={handleMetricChange} />
          </div>

          {results && <HealthResults results={results} />}
        </div>
      </Card>
    </div>
  );
};

export default HealthCalculator;