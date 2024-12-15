import { saveAs } from 'file-saver';

export const exportHealthResults = (results: any) => {
  console.log('Exporting health results:', results);
  
  const resultsForExport = {
    ...results,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };

  const blob = new Blob([JSON.stringify(resultsForExport, null, 2)], {
    type: 'application/json'
  });

  saveAs(blob, `health-results-${new Date().toISOString()}.json`);
};