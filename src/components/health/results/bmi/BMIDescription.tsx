import { ReactNode } from "react";

interface BMIDescriptionProps {
  title: string;
  formula: string;
  description: string;
  interpretation: ReactNode;
}

const BMIDescription = ({ title, formula, description, interpretation }: BMIDescriptionProps) => {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold">{title}</h4>
      <div className="text-sm space-y-2">
        <div>
          <p className="font-medium">Formula:</p>
          <p className="text-mint-700">{formula}</p>
        </div>
        <div>
          <p className="font-medium">Description:</p>
          <p>{description}</p>
        </div>
        <div>
          <p className="font-medium">Interpretation:</p>
          {interpretation}
        </div>
      </div>
    </div>
  );
};

export default BMIDescription;