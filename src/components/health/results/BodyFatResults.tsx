import BodyFatCard from "./cards/BodyFatCard";
import { bodyFatTooltips } from "./config/bodyFatTooltips";

interface BodyFatResultsProps {
  bodyFat: {
    navy: number | null;
    jackson: number | null;
    bmiBased: number | null;
    army: number | null;
  };
  gender: 'male' | 'female';
}

const BodyFatResults = ({ bodyFat, gender }: BodyFatResultsProps) => {
  console.log('BodyFat Results Props:', { bodyFat, gender });

  return (
    <div className="space-y-4 w-full">
      <h3 className="text-lg font-medium text-mint-800">Body Fat Percentage</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {Object.entries(bodyFat).map(([key, value]) => {
          console.log(`Processing ${key} with value:`, value);
          
          if (typeof value === 'number' && !isNaN(value)) {
            const tooltipContent = {
              ...bodyFatTooltips[key],
              formula: bodyFatTooltips[key].formula[gender]
            };

            return (
              <BodyFatCard
                key={key}
                methodKey={key}
                value={value}
                gender={gender}
                tooltipContent={tooltipContent}
              />
            );
          }
          console.log(`Skipping ${key} - invalid value:`, value);
          return null;
        })}
      </div>
    </div>
  );
};

export default BodyFatResults;