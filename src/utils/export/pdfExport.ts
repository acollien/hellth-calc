import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { metricRanges } from './ranges';

export const exportToPDF = (results: any) => {
  console.log('Starting PDF export with results:', results);
  const doc = new jsPDF();
  
  // Title and date
  doc.setFontSize(20);
  doc.setTextColor(41, 128, 185);
  doc.text('Health Metrics Report', 14, 15);
  
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 25);

  let startY = 40;

  const formatMetricValue = (metric: string, value: any): string => {
    console.log(`Formatting metric: ${metric} with value:`, value);
    
    if (typeof value === 'object') {
      if (metric.toLowerCase().includes('bmi')) {
        return `${value.standard.toFixed(1)}`;
      }
      if (metric.toLowerCase().includes('body fat')) {
        const navyValue = value.navy !== null ? value.navy.toFixed(1) : 'N/A';
        return `${navyValue}%`;
      }
      if (value.metric !== undefined) {
        return value.metric.toFixed(2);
      }
      if (value.bmr !== undefined) {
        return `${value.bmr.toFixed(0)} kcal/day`;
      }
      return JSON.stringify(value);
    }
    
    if (metric === "Biological Age") {
      return `${value} years`;
    }
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return String(value);
  };

  const getMetricInterpretation = (metric: string, value: any): string => {
    console.log(`Getting interpretation for metric: ${metric} with value:`, value);
    
    if (metric === "Biological Age") {
      const actualAge = results.age ? parseFloat(results.age) : null;
      if (actualAge) {
        const diff = value - actualAge;
        return Math.abs(diff) < 0.1 
          ? "Matches chronological age"
          : `${Math.abs(diff).toFixed(1)} years ${diff > 0 ? 'older' : 'younger'} than chronological age`;
      }
      return `${value} years`;
    }

    if (typeof value === 'object') {
      if (metric.toLowerCase().includes('bmi')) {
        return getMetricRange('BMI', value.standard);
      }
      if (metric.toLowerCase().includes('body fat')) {
        return getMetricRange('Body Fat % (Navy)', value.navy);
      }
      if (value.metric !== undefined) {
        return getMetricRange(metric, value.metric);
      }
    }

    return getMetricRange(metric, value);
  };

  const getMetricRange = (metric: string, value: number): string => {
    if (typeof value !== 'number' || isNaN(value)) {
      return 'Invalid value';
    }

    const ranges = metricRanges[metric]?.ranges;
    if (!ranges) {
      return '';
    }

    const range = ranges.find(r => value >= r.min && value <= r.max);
    return range ? `${range.label}: ${range.description}` : '';
  };

  // Prepare data for table
  const tableData = Object.entries(results)
    .filter(([key, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
      const formattedValue = formatMetricValue(formattedKey, value);
      const interpretation = getMetricInterpretation(formattedKey, value);
      return [formattedKey, formattedValue, interpretation];
    });

  console.log('Prepared table data:', tableData);

  // Configure and draw table
  autoTable(doc, {
    startY,
    head: [['Metric', 'Value', 'Interpretation']],
    body: tableData,
    styles: {
      fontSize: 8,
      cellPadding: 3,
      overflow: 'linebreak',
      cellWidth: 'auto'
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold',
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 40 },
      2: { cellWidth: 70 }
    },
    margin: { left: 14, right: 14 },
    tableWidth: 182
  });

  doc.save('health-metrics.pdf');
};