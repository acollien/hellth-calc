import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getMetricRange, getBiologicalAgeInterpretation } from './ranges';

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
    if (typeof value === 'object') {
      if (metric.toLowerCase().includes('bmi')) {
        return `${value.standard.toFixed(1)}`;
      }
      if (metric.toLowerCase().includes('body fat')) {
        return `${value.navy ? value.navy.toFixed(1) : 'N/A'}%`;
      }
      if (value.metric !== undefined) {
        return value.metric.toFixed(2).toString();
      }
      if (value.bmr !== undefined) {
        return `${value.bmr} kcal/day`;
      }
      return 'Complex Value';
    }
    
    if (metric === "Biological Age") return `${value} years`;
    if (metric.includes("BMR") || metric.includes("TDEE")) return `${value} kcal/day`;
    if (typeof value === 'number') return value.toFixed(2);
    return String(value);
  };

  const getMetricInterpretation = (metric: string, value: any, results: any): string => {
    if (metric === "Biological Age") {
      return getBiologicalAgeInterpretation(value, Number(results.age || 0));
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

  // Prepare data for table
  const tableData = Object.entries(results)
    .filter(([key, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      const formattedValue = formatMetricValue(key, value);
      const interpretation = getMetricInterpretation(key, value, results);
      return [key, formattedValue, interpretation];
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
      overflow: 'linebreak' as const,
      cellWidth: 'auto' as const
    },
    headStyles: {
      fillColor: [41, 128, 185] as [number, number, number],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold' as const,
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