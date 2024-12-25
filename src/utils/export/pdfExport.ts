import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getMetricRange, getBiologicalAgeInterpretation } from './ranges';

export const exportToPDF = (results: any) => {
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
    if (metric === "Biological Age") return `${value} years`;
    if (metric.includes("BMR") || metric.includes("TDEE")) return `${value} kcal/day`;
    return String(value);
  };

  const getMetricInterpretation = (metric: string, value: any, metrics?: any): string => {
    if (metric === "Biological Age") {
      return getBiologicalAgeInterpretation(value, Number(metrics?.age || 0));
    }
    return getMetricRange(metric, value);
  };

  const tableConfig = {
    startY,
    head: [['Metric', 'Value', 'Interpretation']],
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
  };

  Object.entries(results).forEach(([metric, value]) => {
    const formattedValue = formatMetricValue(metric, value);
    const interpretation = getMetricInterpretation(metric, value, results);
    autoTable(doc, {
      ...tableConfig,
      body: [[metric, formattedValue, interpretation]],
    });
  });

  doc.save('health-metrics.pdf');
};
