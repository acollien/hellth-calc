import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

interface ExtendedJsPDF extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

export const exportHealthResults = (results: any) => {
  console.log('Exporting health results to PDF:', results);
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Add title and styling
  doc.setFontSize(24);
  doc.setTextColor(42, 149, 135); // mint-800
  doc.text('Health Metrics Report', pageWidth / 2, 20, { align: 'center' });
  
  // Add date
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text(`Generated on: ${format(new Date(), 'PPP')}`, pageWidth / 2, 30, { align: 'center' });
  
  let currentY = 45;

  // Body Fat Section
  if (results.bodyFat) {
    doc.setFontSize(16);
    doc.setTextColor(42, 149, 135);
    doc.text('Body Fat Percentage', 20, currentY);
    
    const bodyFatData = [
      ['Method', 'Value', 'Interpretation'],
      ['Navy Method', 
       results.bodyFat.navy?.toFixed(1) + '%' || 'N/A', 
       'Men:\nEssential: 2-5%\nAthletes: 6-13%\nFitness: 14-17%\nAverage: 18-24%\nObese: 25%+\n\nWomen:\nEssential: 10-13%\nAthletes: 14-20%\nFitness: 21-24%\nAverage: 25-31%\nObese: 32%+'],
      ['Jackson-Pollock Method', 
       results.bodyFat.jackson?.toFixed(1) + '%' || 'N/A', 
       'Men:\nEssential: 2-5%\nAthletes: 6-13%\nFitness: 14-17%\nAverage: 18-24%\nObese: 25%+\n\nWomen:\nEssential: 10-13%\nAthletes: 14-20%\nFitness: 21-24%\nAverage: 25-31%\nObese: 32%+'],
      ['BMI-Based Method', 
       results.bodyFat.bmiBased?.toFixed(1) + '%' || 'N/A', 
       'Men:\nVery Low: <8%\nLow: 8-15%\nNormal: 15-20%\nModerate: 20-25%\nHigh: >25%\n\nWomen:\nVery Low: <15%\nLow: 15-22%\nNormal: 22-27%\nModerate: 27-32%\nHigh: >32%'],
      ['U.S. Army Method', 
       results.bodyFat.army?.toFixed(1) + '%' || 'N/A', 
       'Men:\n17-20 years: <20%\n21-27 years: <22%\n28-39 years: <24%\n40+ years: <26%\n\nWomen:\n17-20 years: <30%\n21-27 years: <32%\n28-39 years: <34%\n40+ years: <36%']
    ];
    
    autoTable(doc, {
      startY: currentY + 5,
      head: [bodyFatData[0]],
      body: bodyFatData.slice(1),
      theme: 'striped',
      headStyles: { fillColor: [42, 149, 135] },
      columnStyles: {
        2: { cellWidth: 80 }
      },
      styles: { cellPadding: 5 }
    });
  }
  
  currentY = (doc as ExtendedJsPDF).lastAutoTable?.finalY || currentY + 40;

  // Body Composition Indices
  doc.setFontSize(16);
  doc.setTextColor(42, 149, 135);
  doc.text('Body Composition Indices', 20, currentY + 15);
  
  const indicesData = [
    ['Index', 'Value', 'Interpretation'],
    ['Ponderal Index', 
     results.ponderalIndex?.metric?.toFixed(2) || 'N/A', 
     'Underweight: <11\nNormal weight: 11-14\nOverweight: 14-17\nObese: >17'],
    ['A Body Shape Index (ABSI)', 
     results.absi?.metric?.toFixed(3) || 'N/A', 
     'Low mortality risk: <0.07\nAverage mortality risk: 0.07-0.08\nHigh mortality risk: >0.08'],
    ['Body Roundness Index', 
     results.bodyRoundnessIndex?.metric?.toFixed(2) || 'N/A', 
     'Very lean: <1\nNormal: 1-2\nOverweight: 2-3\nObese: >3'],
    ['Waist-Height Ratio', 
     results.waistToHeightRatio?.toFixed(2) || 'N/A', 
     'Underweight: <0.4\nHealthy: 0.4-0.5\nOverweight: 0.5-0.6\nObese: >0.6'],
    ['Lean Body Mass', 
     `${results.leanBodyMass?.toFixed(1) || 'N/A'} kg`, 
     'Low: <35 kg\nNormal: 35-65 kg\nHigh: 65-80 kg\nVery High: >80 kg'],
    ['Fat-Free Mass Index', 
     results.fatFreeMassIndex?.toFixed(1) || 'N/A', 
     'Low: <16\nNormal: 16-20\nAthletic: 20-25\nExceptional: >25'],
    ['Skeletal Muscle Mass', 
     `${results.skeletalMuscleMass?.toFixed(1) || 'N/A'} kg`, 
     'Low: <25 kg\nNormal: 25-45 kg\nAthletic: 45-55 kg\nElite: >55 kg'],
    ['Body Fat Distribution Index', 
     results.bodyFatDistribution?.toFixed(2) || 'N/A', 
     'Optimal: <0.5\nModerate: 0.5-0.8\nHigh Risk: >0.8']
  ];
  
  autoTable(doc, {
    startY: currentY + 20,
    head: [indicesData[0]],
    body: indicesData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [42, 149, 135] },
    columnStyles: {
      2: { cellWidth: 80 }
    },
    styles: { cellPadding: 5 }
  });
  
  currentY = (doc as ExtendedJsPDF).lastAutoTable?.finalY || currentY + 40;

  // Other Metrics
  doc.setFontSize(16);
  doc.text('Additional Health Metrics', 20, currentY + 15);
  
  const otherData = [
    ['Metric', 'Value', 'Interpretation'],
    ['Frame Size', 
     results.frameSize || 'N/A', 
     'Small: Height/Wrist > 10.4\nMedium: Height/Wrist 9.6-10.4\nLarge: Height/Wrist < 9.6'],
    ['Waist-to-Hip Ratio', 
     results.waistToHip?.toFixed(2) || 'N/A', 
     'Men:\nHealthy: <0.9\nIncreased Risk: >0.9\n\nWomen:\nHealthy: <0.85\nIncreased Risk: >0.85'],
    ['Biological Age', 
     results.biologicalAge ? `${results.biologicalAge} years` : 'N/A', 
     'Compares physiological age to chronological age based on health metrics']
  ];
  
  autoTable(doc, {
    startY: currentY + 20,
    head: [otherData[0]],
    body: otherData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [42, 149, 135] },
    columnStyles: {
      2: { cellWidth: 80 }
    },
    styles: { cellPadding: 5 }
  });

  // Add footer with page numbers
  const pageCount = (doc.internal as any).getNumberOfPages();
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105); // slate-600
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
  doc.save(`health-metrics-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};
