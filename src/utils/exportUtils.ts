import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatDate } from '@/lib/utils';

export const exportHealthResults = (results: any) => {
  console.log('Exporting health results to PDF:', results);
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Add title
  doc.setFontSize(20);
  doc.text('Health Metrics Report', pageWidth / 2, 20, { align: 'center' });
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Generated on: ${formatDate(new Date())}`, pageWidth / 2, 30, { align: 'center' });
  
  // Basic Metrics Section
  doc.setFontSize(16);
  doc.text('Basic Metrics', 20, 45);
  
  const basicMetricsData = [
    ['Metric', 'Value'],
    ['BMI', results.bmi?.standard?.toFixed(1) || 'N/A'],
    ['Body Fat %', results.bodyFat?.navy?.toFixed(1) || 'N/A'],
    ['BMR', `${results.bmr?.bmr?.toFixed(0) || 'N/A'} calories/day`],
  ];
  
  autoTable(doc, {
    startY: 50,
    head: [basicMetricsData[0]],
    body: basicMetricsData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [42, 149, 135] },
  });
  
  // Body Composition Section
  doc.text('Body Composition', 20, doc.lastAutoTable.finalY + 20);
  
  const bodyCompData = [
    ['Metric', 'Value'],
    ['Lean Body Mass', `${results.leanBodyMass?.toFixed(1) || 'N/A'} kg`],
    ['Fat Free Mass Index', results.fatFreeMassIndex?.toFixed(1) || 'N/A'],
    ['Skeletal Muscle Mass', `${results.skeletalMuscleMass?.toFixed(1) || 'N/A'} kg`],
  ];
  
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 25,
    head: [bodyCompData[0]],
    body: bodyCompData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [42, 149, 135] },
  });
  
  // Body Indices Section
  doc.text('Body Indices', 20, doc.lastAutoTable.finalY + 20);
  
  const indicesData = [
    ['Index', 'Value'],
    ['Ponderal Index', results.ponderalIndex?.metric?.toFixed(2) || 'N/A'],
    ['ABSI', results.absi?.metric?.toFixed(3) || 'N/A'],
    ['Body Roundness Index', results.bodyRoundnessIndex?.metric?.toFixed(2) || 'N/A'],
    ['Waist to Height Ratio', results.waistToHeightRatio?.toFixed(2) || 'N/A'],
  ];
  
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 25,
    head: [indicesData[0]],
    body: indicesData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [42, 149, 135] },
  });
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(10);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
  
  // Save the PDF
  doc.save(`health-metrics-${formatDate(new Date())}.pdf`);
};