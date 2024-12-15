import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportResults = (results: any, format: 'pdf' | 'json') => {
  if (!results) return;

  const data = {
    "Body Composition": {
      "BMI (Standard)": results.bmi?.standard?.toFixed(1) || 'N/A',
      "Body Fat % (Navy)": results.bodyFat?.navy?.toFixed(1) || 'N/A',
      "Body Fat % (Jackson)": results.bodyFat?.jackson?.toFixed(1) || 'N/A',
      "Lean Body Mass": `${results.leanBodyMass?.toFixed(1) || 'N/A'} kg`,
      "Fat Free Mass Index": results.fatFreeMassIndex?.toFixed(1) || 'N/A',
      "Skeletal Muscle Mass": `${results.skeletalMuscleMass?.toFixed(1) || 'N/A'} kg`,
      "Frame Size": results.frameSize || 'N/A'
    },
    "Body Shape Indices": {
      "Ponderal Index": results.ponderalIndex?.metric?.toFixed(2) || 'N/A',
      "ABSI": results.absi?.metric?.toFixed(3) || 'N/A',
      "Body Roundness": results.bodyRoundnessIndex?.metric?.toFixed(2) || 'N/A',
      "Body Adiposity": results.bodyAdiposityIndex?.toFixed(2) || 'N/A',
      "Conicity Index": results.conicityIndex?.toFixed(3) || 'N/A',
      "Body Fat Distribution": results.bodyFatDistribution?.toFixed(2) || 'N/A'
    },
    "Health Ratios": {
      "Waist-to-Hip": results.waistToHip?.toFixed(3) || 'N/A',
      "Waist-to-Height": results.waistToHeightRatio?.toFixed(3) || 'N/A'
    },
    "Metabolic Data": {
      "BMR": `${results.bmr?.bmr || 'N/A'} kcal`,
      "TDEE": `${results.bmr?.tdee || 'N/A'} kcal`,
      "Biological Age": `${results.biologicalAge || 'N/A'} years`
    },
    "Ideal Weight Ranges": {
      "Robinson Formula": `${results.idealWeight?.robinson?.toFixed(1) || 'N/A'} kg`,
      "Miller Formula": `${results.idealWeight?.miller?.toFixed(1) || 'N/A'} kg`,
      "Devine Formula": `${results.idealWeight?.devine?.toFixed(1) || 'N/A'} kg`
    }
  };

  if (format === 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'health-metrics.json');
  } else {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(16);
    doc.setTextColor(41, 128, 185); // Mint color
    doc.text('Health Metrics Report', 14, 15);
    
    let yOffset = 25;
    const pageWidth = doc.internal.pageSize.width;
    
    // Configure smaller font and row sizes for compact layout
    const tableConfig = {
      styles: { 
        fontSize: 8,
        cellPadding: 1
      },
      headStyles: { 
        fillColor: [41, 128, 185],
        fontSize: 8,
        cellPadding: 1
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40 }
      },
      margin: { left: 14 }
    };
    
    // Convert data to format suitable for autoTable
    Object.entries(data).forEach(([section, metrics], index) => {
      // Add section header
      doc.setFontSize(10);
      doc.setTextColor(41, 128, 185);
      doc.text(section, 14, yOffset);
      
      const tableData = Object.entries(metrics).map(([key, value]) => [key, value]);
      
      autoTable(doc, {
        ...tableConfig,
        startY: yOffset + 2,
        head: [['Metric', 'Value']],
        body: tableData,
      });
      
      yOffset = (doc as any).lastAutoTable.finalY + 5;
    });
    
    // Add footer with date
    const date = new Date().toLocaleDateString();
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${date}`, 14, doc.internal.pageSize.height - 10);
    
    doc.save('health-metrics.pdf');
  }
};