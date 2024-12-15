import RangeBar from "@/components/health/visualizations/RangeBar";

interface BMIResultsProps {
  bmi: {
    standard: number;
    devine: number;
    athletic: number;
  };
}

const BMIResults = ({ bmi }: BMIResultsProps) => {
  const bmiRanges = [
    {
      min: 0,
      max: 18.5,
      label: "Underweight",
      color: "#D3E4FD",
      description: "BMI less than 18.5"
    },
    {
      min: 18.5,
      max: 24.9,
      label: "Normal",
      color: "#F2FCE2",
      description: "BMI between 18.5 and 24.9"
    },
    {
      min: 25,
      max: 29.9,
      label: "Overweight",
      color: "#FEC6A1",
      description: "BMI between 25 and 29.9"
    },
    {
      min: 30,
      max: 40,
      label: "Obese",
      color: "#ea384c",
      description: "BMI 30 or greater"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">BMI Results</h3>
      <div className="grid gap-4">
        {Object.entries(bmi).map(([key, value]) => (
          <div key={key} className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <div className="mb-2">
              <div className="text-sm text-mint-800 font-medium capitalize">{key} BMI</div>
              <div className="text-2xl font-semibold text-mint-900">
                {value.toFixed(1)}
              </div>
            </div>
            <RangeBar
              value={value}
              ranges={bmiRanges}
              max={40}
              unit="BMI"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BMIResults;