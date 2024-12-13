import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HealthMetrics } from "./types";

interface ActivityLevelProps {
  metrics: HealthMetrics;
  onMetricChange: (key: keyof HealthMetrics, value: string) => void;
}

const ActivityLevel = ({ metrics, onMetricChange }: ActivityLevelProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="activityLevel">Activity Level</Label>
      <Select
        value={metrics.activityLevel}
        onValueChange={(value: HealthMetrics['activityLevel']) => 
          onMetricChange('activityLevel', value)}
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
  );
};

export default ActivityLevel;