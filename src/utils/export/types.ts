export interface ExportRange {
  min: number;
  max: number;
  label: string;
  description: string;
}

export interface MetricRange {
  ranges: ExportRange[];
  unit?: string;
}