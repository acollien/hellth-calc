import { createContext, useContext, useReducer, ReactNode } from 'react';
import { HealthMetrics, HealthResult } from '@/components/health/types';

type HealthState = {
  metrics: HealthMetrics;
  results: HealthResult | null;
};

type HealthAction = 
  | { type: 'UPDATE_METRIC'; key: keyof HealthMetrics; value: string }
  | { type: 'SET_METRICS'; metrics: HealthMetrics }
  | { type: 'SET_RESULTS'; results: HealthResult };

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

const initialState: HealthState = {
  metrics: initialMetrics,
  results: null
};

const healthReducer = (state: HealthState, action: HealthAction): HealthState => {
  switch (action.type) {
    case 'UPDATE_METRIC':
      return {
        ...state,
        metrics: {
          ...state.metrics,
          [action.key]: action.value
        }
      };
    case 'SET_METRICS':
      return {
        ...state,
        metrics: action.metrics
      };
    case 'SET_RESULTS':
      return {
        ...state,
        results: action.results
      };
    default:
      return state;
  }
};

const HealthContext = createContext<{
  state: HealthState;
  dispatch: React.Dispatch<HealthAction>;
} | undefined>(undefined);

export const HealthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(healthReducer, initialState);

  return (
    <HealthContext.Provider value={{ state, dispatch }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};