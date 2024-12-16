interface GroupResultsProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const GroupResults = ({ title, description, children }: GroupResultsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-mint-800">{title}</h3>
        <p className="text-sm text-mint-600">{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
};

export default GroupResults;