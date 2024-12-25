import { saveAs } from 'file-saver';

export const exportToJSON = (data: any) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  saveAs(blob, 'health-metrics.json');
};