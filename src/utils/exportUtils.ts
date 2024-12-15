import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportResults = (results: any, format: 'pdf' | 'json') => {
  if (!results) return;

  console.log("Exporting results:", results);

  const data = {
    "Primary Metrics": {
      "BMI (Standard)": results.bmi?.standard?.toFixed(1) || 'N/A',
      "Body Fat % (Navy)": results.bodyFat?.navy?.toFixed(1) || 'N/A',
      "Body Fat % (Jackson)": results.bodyFat?.jackson?.toFixed(1) || 'N/A',
      "Body Fat % (BMI Based)": results.bodyFat?.bmiBased?.toFixed(1) || 'N/A',
      "Body Fat % (Army)": results.bodyFat?.army?.toFixed(1) || 'N/A',
      "Basal Metabolic Rate": `${results.bmr?.bmr?.toFixed(0) || 'N/A'} kcal`,
      "Total Daily Energy": `${results.bmr?.tdee?.toFixed(0) || 'N/A'} kcal`,
      "Biological Age": `${results.biologicalAge?.toFixed(1) || 'N/A'} years`
    },
    "Body Composition": {
      "Lean Body Mass": `${results.leanBodyMass?.toFixed(1) || 'N/A'} kg`,
      "Fat Free Mass Index": results.fatFreeMassIndex?.toFixed(1) || 'N/A',
      "Skeletal Muscle Mass": `${results.skeletalMuscleMass?.toFixed(1) || 'N/A'} kg`,
      "Body Fat Distribution": results.bodyFatDistribution?.toFixed(2) || 'N/A',
      "Frame Size": results.frameSize || 'N/A'
    },
    "Body Indices": {
      "Ponderal Index (Metric)": results.ponderalIndex?.metric?.toFixed(2) || 'N/A',
      "ABSI (Metric)": results.absi?.metric?.toFixed(3) || 'N/A',
      "Body Roundness Index": results.bodyRoundnessIndex?.metric?.toFixed(2) || 'N/A',
      "Lean Mass Index": results.leanMassIndex?.toFixed(2) || 'N/A',
      "Body Adiposity Index": results.bodyAdiposityIndex?.toFixed(2) || 'N/A',
      "Conicity Index": results.conicityIndex?.toFixed(3) || 'N/A'
    },
    "Health Ratios": {
      "Waist-to-Hip Ratio": results.waistToHip?.toFixed(3) || 'N/A',
      "Waist-to-Height Ratio": results.waistToHeightRatio?.toFixed(3) || 'N/A'
    },
    "Ideal Weight Ranges": {
      "Robinson Formula": `${results.idealWeight?.robinson?.toFixed(1) || 'N/A'} kg`,
      "Miller Formula": `${results.idealWeight?.miller?.toFixed(1) || 'N/A'} kg`,
      "Devine Formula": `${results.idealWeight?.devine?.toFixed(1) || 'N/A'} kg`,
      "Athletic Formula": `${results.idealWeight?.athletic?.toFixed(1) || 'N/A'} kg`,
      "BMI Based Range": `${results.idealWeight?.bmiBased?.toFixed(1) || 'N/A'} kg`
    }
  };

  if (format === 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'health-metrics.json');
  } else {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(41, 128, 185);
    doc.text('Health Metrics Report', 14, 20);
    
    // Date
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);

    let startY = 40;
    
    // Configure table settings for full-page layout
    const tableConfig = {
      startY,
      head: [['Metric', 'Value']],
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak' as const,
        cellWidth: 'auto' as const
      },
      headStyles: {
        fillColor: [41, 128, 185] as [number, number, number], // Fixed: Explicitly type as RGB tuple
        textColor: 255,
        fontSize: 9,
        fontStyle: 'bold' as const,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 70 }
      },
      margin: { left: 14, right: 14 },
      tableWidth: 180
    };

    // Add each section to the PDF
    Object.entries(data).forEach(([section, metrics], index) => {
      const tableData = Object.entries(metrics).map(([key, value]) => [key, value]);
      
      // Add section header
      doc.setFontSize(12);
      doc.setTextColor(41, 128, 185);
      doc.text(section, 14, startY - 5);
      
      // Add table
      autoTable(doc, {
        ...tableConfig,
        startY,
        body: tableData,
      });
      
      startY = (doc as any).lastAutoTable.finalY + 10;
    });

    doc.save('health-metrics.pdf');
  }
};