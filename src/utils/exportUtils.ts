import { exportToPDF } from './export/pdfExport';
import { exportToJSON } from './export/jsonExport';

export const exportResults = (results: any, format: 'pdf' | 'json') => {
  if (!results) return;

  console.log("Full results object received in exportUtils:", results);

  if (format === 'json') {
    exportToJSON(results);
  } else {
    exportToPDF(results);
  }
};