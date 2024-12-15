import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportResults = (results: any, format: 'pdf' | 'json') => {
  if (!results) return;

  const data = {
    "Body Composition": {
      "Body Fat Percentage": results.bodyFat?.navy || 'N/A',
      "Body Fat (Jackson-Pollock)": results.bodyFat?.jackson || 'N/A',
      "Body Fat (BMI-based)": results.bodyFat?.bmiBased || 'N/A',
      "Body Fat (Army Method)": results.bodyFat?.army || 'N/A',
      "Lean Body Mass": results.leanBodyMass || 'N/A',
      "Fat Free Mass Index": results.fatFreeMassIndex || 'N/A',
      "Skeletal Muscle Mass": results.skeletalMuscleMass || 'N/A',
      "Body Fat Distribution": results.bodyFatDistribution || 'N/A',
      "Lean Mass Index": results.leanMassIndex || 'N/A',
      "Frame Size": results.frameSize || 'N/A'
    },
    "Body Indices": {
      "BMI (Standard)": results.bmi?.standard || 'N/A',
      "BMI (Devine)": results.bmi?.devine || 'N/A',
      "BMI (Athletic)": results.bmi?.athletic || 'N/A',
      "Ponderal Index": results.ponderalIndex || 'N/A',
      "ABSI": results.absi || 'N/A',
      "Body Roundness Index": results.bodyRoundnessIndex || 'N/A',
      "Body Adiposity Index": results.bodyAdiposityIndex || 'N/A',
      "Conicity Index": results.conicityIndex || 'N/A'
    },
    "Metabolic & Other Metrics": {
      "BMR": results.bmr?.bmr || 'N/A',
      "TDEE": results.bmr?.tdee || 'N/A',
      "Waist to Hip Ratio": results.waistToHip || 'N/A',
      "Waist to Height Ratio": results.waistToHeightRatio || 'N/A',
      "Biological Age": results.biologicalAge || 'N/A'
    },
    "Ideal Weight Ranges": {
      "Robinson Formula": results.idealWeight?.robinson || 'N/A',
      "Miller Formula": results.idealWeight?.miller || 'N/A',
      "Devine Formula": results.idealWeight?.devine || 'N/A'
    },
    "Trend Metrics (3-Month Projection)": {
      "Projected BMI": results.bmi ? (results.bmi.standard * 0.95).toFixed(1) : 'N/A',
      "Projected Body Fat %": results.bodyFat?.navy ? (results.bodyFat.navy * 0.93).toFixed(1) : 'N/A',
      "Projected BMR": results.bmr?.bmr ? Math.round(results.bmr.bmr * 1.04) : 'N/A'
    }
  };

  if (format === 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'health-metrics.json');
  } else {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('Health Metrics Report', 14, 15);
    doc.setFontSize(10);
    
    let yOffset = 25;
    
    // Convert data to format suitable for autoTable
    Object.entries(data).forEach(([section, metrics]) => {
      // Add section header
      doc.setFontSize(12);
      doc.text(section, 14, yOffset);
      yOffset += 5;
      
      const tableData = Object.entries(metrics).map(([key, value]) => [key, value]);
      
      autoTable(doc, {
        startY: yOffset,
        head: [['Metric', 'Value']],
        body: tableData,
        margin: { left: 14 },
        headStyles: { fillColor: [41, 128, 185] },
      });
      
      yOffset = (doc as any).lastAutoTable.finalY + 10;
    });
    
    doc.save('health-metrics.pdf');
  }
};