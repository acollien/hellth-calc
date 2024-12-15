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

  // Basic Metrics Section
  doc.setFontSize(16);
  doc.setTextColor(42, 149, 135);
  doc.text('Body Mass Index (BMI)', 20, currentY);
  
  if (results.bmi) {
    const bmiData = [
      ['Metric', 'Value', 'Interpretation'],
      ['Standard BMI', results.bmi.standard?.toFixed(1) || 'N/A', 'Under 18.5: Underweight\n18.5-24.9: Normal\n25-29.9: Overweight\n30+: Obese'],
      ['Devine BMI', results.bmi.devine?.toFixed(1) || 'N/A', 'Under 19: Underweight\n19-24: Ideal\n24-29: Slightly overweight\n29+: Overweight'],
      ['Athletic BMI', results.bmi.athletic?.toFixed(1) || 'N/A', 'Under 16.5: Too lean\n16.5-22.5: Athletic\n22.5-27: Muscular\n27+: May need assessment'],
    ];
    
    autoTable(doc, {
      startY: currentY + 5,
      head: [bmiData[0]],
      body: bmiData.slice(1),
      theme: 'striped',
      headStyles: { fillColor: [42, 149, 135] },
      columnStyles: {
        2: { cellWidth: 80 }
      },
      styles: { cellPadding: 5 }
    });
  }
  
  currentY = (doc as ExtendedJsPDF).lastAutoTable?.finalY || currentY + 40;

  // Body Fat Section
  if (results.bodyFat) {
    doc.setFontSize(16);
    doc.text('Body Fat Percentage', 20, currentY + 15);
    
    const bodyFatData = [
      ['Method', 'Value', 'Interpretation'],
      ['Navy Method', results.bodyFat.navy?.toFixed(1) + '%' || 'N/A', 'Men:\nEssential: 2-5%\nAthletes: 6-13%\nFitness: 14-17%\nAverage: 18-24%\nObese: 25%+\n\nWomen:\nEssential: 10-13%\nAthletes: 14-20%\nFitness: 21-24%\nAverage: 25-31%\nObese: 32%+'],
      ['Jackson-Pollock', results.bodyFat.jackson?.toFixed(1) + '%' || 'N/A', 'Uses multiple skinfold measurements for precise calculation'],
      ['BMI-Based', results.bodyFat.bmiBased?.toFixed(1) + '%' || 'N/A', 'Estimates based on BMI correlation'],
      ['Army Method', results.bodyFat.army?.toFixed(1) + '%' || 'N/A', 'Official U.S. Army assessment method'],
    ];
    
    autoTable(doc, {
      startY: currentY + 20,
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

  // Metabolic Rates Section
  if (results.bmr) {
    doc.setFontSize(16);
    doc.text('Metabolic Rates', 20, currentY + 15);
    
    const bmrData = [
      ['Metric', 'Value', 'Description'],
      ['BMR', `${Math.round(results.bmr.bmr)} cal/day`, 'Basal Metabolic Rate - calories burned at rest'],
      ['TDEE', results.bmr.tdee ? `${Math.round(results.bmr.tdee)} cal/day` : 'N/A', 'Total Daily Energy Expenditure with activity'],
    ];
    
    autoTable(doc, {
      startY: currentY + 20,
      head: [bmrData[0]],
      body: bmrData.slice(1),
      theme: 'striped',
      headStyles: { fillColor: [42, 149, 135] },
      styles: { cellPadding: 5 }
    });
  }
  
  currentY = (doc as ExtendedJsPDF).lastAutoTable?.finalY || currentY + 40;

  // Body Composition Indices
  doc.setFontSize(16);
  doc.text('Body Composition Indices', 20, currentY + 15);
  
  const indicesData = [
    ['Index', 'Value', 'Interpretation'],
    ['Ponderal Index', results.ponderalIndex?.metric?.toFixed(2) || 'N/A', 'Measures leanness relative to height'],
    ['ABSI', results.absi?.metric?.toFixed(3) || 'N/A', 'Body Shape Index - mortality risk indicator'],
    ['Body Roundness', results.bodyRoundnessIndex?.metric?.toFixed(2) || 'N/A', 'Indicates cardiovascular health risk'],
    ['Waist-Height Ratio', results.waistToHeightRatio?.toFixed(2) || 'N/A', 'Under 0.5: Healthy\n0.5-0.6: Elevated Risk\nOver 0.6: High Risk'],
    ['Lean Body Mass', results.leanBodyMass?.toFixed(1) || 'N/A', 'Total weight minus body fat'],
    ['Fat-Free Mass Index', results.fatFreeMassIndex?.toFixed(1) || 'N/A', 'Under 16: Low\n16-20: Normal\n20-25: Athletic\nOver 25: Exceptional'],
    ['Skeletal Muscle Mass', results.skeletalMuscleMass?.toFixed(1) || 'N/A', 'Amount of muscle attached to bones'],
    ['Body Fat Distribution', results.bodyFatDistribution?.toFixed(2) || 'N/A', 'Under 0.5: Optimal\n0.5-0.8: Moderate\nOver 0.8: High Risk'],
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
  if (results.frameSize || results.waistToHip || results.biologicalAge) {
    doc.setFontSize(16);
    doc.text('Additional Health Metrics', 20, currentY + 15);
    
    const otherData = [
      ['Metric', 'Value', 'Interpretation'],
      ['Frame Size', results.frameSize || 'N/A', 'Based on wrist circumference relative to height'],
      ['Waist-to-Hip Ratio', results.waistToHip?.toFixed(2) || 'N/A', 'Men:\nUnder 0.9: Healthy\nOver 0.9: Increased Risk\n\nWomen:\nUnder 0.85: Healthy\nOver 0.85: Increased Risk'],
      ['Biological Age', results.biologicalAge ? `${results.biologicalAge} years` : 'N/A', 'Estimated physiological age based on health metrics'],
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
  }

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
