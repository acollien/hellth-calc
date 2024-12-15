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

  // Body Composition Section
  doc.setFontSize(16);
  doc.setTextColor(42, 149, 135);
  doc.text('Body Composition', 20, currentY);
  
  const bodyCompositionData = [
    ['Metric', 'Value', 'Interpretation'],
    ['BMI (Standard)', 
     `${results.bmi?.standard.toFixed(1) || 'N/A'}`, 
     'Underweight: <18.5\nNormal: 18.5-24.9\nOverweight: 25-29.9\nObese: >30'],
    ['BMI (Athletic)', 
     `${results.bmi?.athletic.toFixed(1) || 'N/A'}`, 
     'Athlete Adjusted BMI\nTypically 10% lower than standard BMI'],
    ['Body Fat (Navy)', 
     `${results.bodyFat?.navy?.toFixed(1) || 'N/A'}%`, 
     'Men:\nEssential: 2-5%\nAthletes: 6-13%\nFitness: 14-17%\nAverage: 18-24%\nObese: 25%+\n\nWomen:\nEssential: 10-13%\nAthletes: 14-20%\nFitness: 21-24%\nAverage: 25-31%\nObese: 32%+'],
    ['Body Fat (BMI-Based)', 
     `${results.bodyFat?.bmiBased?.toFixed(1) || 'N/A'}%`, 
     'Men:\nVery Low: <8%\nLow: 8-15%\nNormal: 15-20%\nModerate: 20-25%\nHigh: >25%\n\nWomen:\nVery Low: <15%\nLow: 15-22%\nNormal: 22-27%\nModerate: 27-32%\nHigh: >32%'],
    ['Body Fat (Army)', 
     `${results.bodyFat?.army?.toFixed(1) || 'N/A'}%`, 
     'Men:\n17-20 years: <20%\n21-27 years: <22%\n28-39 years: <24%\n40+ years: <26%\n\nWomen:\n17-20 years: <30%\n21-27 years: <32%\n28-39 years: <34%\n40+ years: <36%'],
    ['Lean Body Mass',
     `${results.leanBodyMass?.toFixed(1) || 'N/A'} kg`,
     'Low: <35kg\nNormal: 35-65kg\nAthletic: 65-80kg\nHigh: >80kg'],
    ['Fat-Free Mass Index',
     `${results.fatFreeMassIndex?.toFixed(1) || 'N/A'}`,
     'Low: <16\nNormal: 16-20\nAthletic: 20-25\nVery High: >25'],
    ['Skeletal Muscle Mass',
     `${results.skeletalMuscleMass?.toFixed(1) || 'N/A'} kg`,
     'Low: <25kg\nNormal: 25-45kg\nAthletic: 45-55kg\nElite: >55kg'],
    ['Body Fat Distribution',
     `${results.bodyFatDistribution?.toFixed(2) || 'N/A'}`,
     'Optimal: <0.5\nModerate: 0.5-0.8\nHigh Risk: >0.8']
  ];

  autoTable(doc, {
    startY: currentY + 5,
    head: [bodyCompositionData[0]],
    body: bodyCompositionData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [42, 149, 135] },
    columnStyles: {
      2: { cellWidth: 80 }
    },
    styles: { cellPadding: 5 }
  });

  currentY = (doc as ExtendedJsPDF).lastAutoTable?.finalY || currentY + 40;

  // Body Indices Section
  doc.setFontSize(16);
  doc.setTextColor(42, 149, 135);
  doc.text('Body Indices', 20, currentY + 15);

  const bodyIndicesData = [
    ['Metric', 'Value', 'Interpretation'],
    ['Ponderal Index', 
     `${results.ponderalIndex?.metric.toFixed(2) || 'N/A'}`, 
     'Underweight: <11\nNormal: 11-14\nOverweight: 14-17\nObese: >17'],
    ['A Body Shape Index', 
     `${results.absi?.metric.toFixed(3) || 'N/A'}`, 
     'Low Risk: <0.07\nAverage Risk: 0.07-0.08\nHigh Risk: >0.08'],
    ['Body Roundness Index', 
     `${results.bodyRoundnessIndex?.metric.toFixed(2) || 'N/A'}`, 
     'Very Lean: <1\nNormal: 1-2\nOverweight: 2-3\nObese: >3'],
    ['Waist-to-Height Ratio', 
     `${results.waistToHeightRatio?.toFixed(2) || 'N/A'}`, 
     'Very Low: <0.4\nHealthy: 0.4-0.5\nOverweight: 0.5-0.6\nObese: >0.6'],
    ['Waist-to-Hip Ratio',
     `${results.waistToHip?.toFixed(2) || 'N/A'}`,
     'Men:\nLow Risk: <0.85\nModerate Risk: 0.85-0.90\nHigh Risk: >0.90\n\nWomen:\nLow Risk: <0.80\nModerate Risk: 0.80-0.85\nHigh Risk: >0.85'],
    ['Body Adiposity Index',
     `${results.bodyAdiposityIndex?.toFixed(1) || 'N/A'}`,
     'Men: 8-20%\nWomen: 21-33%'],
    ['Conicity Index',
     `${results.conicityIndex?.toFixed(2) || 'N/A'}`,
     'Low Risk: <1.25\nModerate Risk: 1.25-1.35\nHigh Risk: >1.35'],
    ['Lean Mass Index',
     `${results.leanMassIndex?.toFixed(1) || 'N/A'}`,
     'Low: <16\nNormal: 16-19\nAthletic: 19-22\nExceptional: >22']
  ];

  autoTable(doc, {
    startY: currentY + 20,
    head: [bodyIndicesData[0]],
    body: bodyIndicesData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [42, 149, 135] },
    columnStyles: {
      2: { cellWidth: 80 }
    },
    styles: { cellPadding: 5 }
  });

  currentY = (doc as ExtendedJsPDF).lastAutoTable?.finalY || currentY + 40;

  // Metabolic & Other Metrics Section
  doc.setFontSize(16);
  doc.setTextColor(42, 149, 135);
  doc.text('Metabolic & Other Metrics', 20, currentY + 15);

  const metabolicData = [
    ['Metric', 'Value', 'Interpretation'],
    ['Basal Metabolic Rate', 
     `${results.bmr?.bmr.toFixed(0) || 'N/A'} calories/day`, 
     'Very Low: <1200\nLow: 1200-1500\nNormal: 1500-1800\nHigh: 1800-2200\nVery High: >2200'],
    ['Total Daily Energy Expenditure', 
     `${results.bmr?.tdee?.toFixed(0) || 'N/A'} calories/day`, 
     'Low Activity: 1.2 × BMR\nLight Activity: 1.375 × BMR\nModerate Activity: 1.55 × BMR\nVery Active: 1.725 × BMR\nExtra Active: 1.9 × BMR'],
    ['Biological Age', 
     `${results.biologicalAge || 'N/A'} years`, 
     'Lower than chronological age: Excellent health\nEqual to chronological age: Average health\nHigher than chronological age: Poor health'],
    ['Frame Size',
     `${results.frameSize || 'N/A'}`,
     'Small: Height/Wrist > 10.4\nMedium: Height/Wrist 9.6-10.4\nLarge: Height/Wrist < 9.6']
  ];

  autoTable(doc, {
    startY: currentY + 20,
    head: [metabolicData[0]],
    body: metabolicData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [42, 149, 135] },
    columnStyles: {
      2: { cellWidth: 80 }
    },
    styles: { cellPadding: 5 }
  });

  currentY = (doc as ExtendedJsPDF).lastAutoTable?.finalY || currentY + 40;

  // Ideal Weight Section
  doc.setFontSize(16);
  doc.setTextColor(42, 149, 135);
  doc.text('Ideal Weight Ranges', 20, currentY + 15);

  const idealWeightData = [
    ['Method', 'Value (kg)', 'Description'],
    ['Robinson Formula', 
     `${results.idealWeight?.robinson.toFixed(1) || 'N/A'}`, 
     'Conservative estimate\nWidely used in medical settings'],
    ['Miller Formula', 
     `${results.idealWeight?.miller.toFixed(1) || 'N/A'}`, 
     'Suitable for lean builds\nTends to give lower estimates'],
    ['Devine Formula', 
     `${results.idealWeight?.devine.toFixed(1) || 'N/A'}`, 
     'Common in clinical settings\nProvides middle-ground estimates']
  ];

  autoTable(doc, {
    startY: currentY + 20,
    head: [idealWeightData[0]],
    body: idealWeightData.slice(1),
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