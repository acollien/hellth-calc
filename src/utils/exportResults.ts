export const exportResults = (results: any) => {
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const resultsData = {
    date: formatDate(new Date()),
    results
  };

  const blob = new Blob([JSON.stringify(resultsData, null, 2)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `health-metrics-${resultsData.date}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};