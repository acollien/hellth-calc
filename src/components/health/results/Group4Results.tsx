import React from 'react';

interface Group4ResultsProps {
  bmi: {
    standard: number;
    devine: number;
    athletic: number;
    bmiBased: number;
  };
  bodyFat: {
    navy: number | null;
    jackson: number | null;
    bmiBased: number | null;
    army: number | null;
  };
  bmr: number;
  unit: 'metric' | 'imperial';
}

const Group4Results = ({ bmi, bodyFat, bmr, unit }: Group4ResultsProps) => {
  console.log("Group4Results received props:", { bmi, bodyFat, bmr, unit });

  // Use standard BMI and prefer navy method for body fat
  const bmiValue = bmi.standard;
  const bodyFatValue = bodyFat.navy || bodyFat.jackson || bodyFat.bmiBased || bodyFat.army || null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Group 4 Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <h4 className="font-semibold">BMI</h4>
          <p className="text-2xl font-semibold">{bmiValue.toFixed(2)}</p>
        </div>
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <h4 className="font-semibold">Body Fat Percentage</h4>
          <p className="text-2xl font-semibold">{bodyFatValue !== null ? bodyFatValue.toFixed(1) + '%' : 'N/A'}</p>
        </div>
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <h4 className="font-semibold">BMR</h4>
          <p className="text-2xl font-semibold">{bmr.toFixed(2)} kcal</p>
        </div>
      </div>
    </div>
  );
};

export default Group4Results;