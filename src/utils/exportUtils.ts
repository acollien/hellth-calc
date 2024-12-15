import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportResults = (results: any, format: 'pdf' | 'json') => {
  if (!results) return;

  console.log("Exporting results:", results);

  const getRangeForMetric = (metric: string, value: number): string => {
    const ranges: { [key: string]: string } = {
      "BMI": value < 18.5 ? "Underweight (<18.5)" : 
             value < 25 ? "Normal (18.5-24.9)" :
             value < 30 ? "Overweight (25-29.9)" : "Obese (≥30)",
      "Body Fat %": value < 10 ? "Essential Fat (<10%)" :
                   value < 20 ? "Athletes (10-20%)" :
                   value < 30 ? "Fitness (20-30%)" : "Excess (>30%)",
      "Lean Mass Index": value < 16 ? "Low (<16)" :
                        value < 19 ? "Normal (16-19)" :
                        value < 22 ? "Athletic (19-22)" : "High (>22)",
      "Waist-to-Hip Ratio": value < 0.85 ? "Low Risk (<0.85)" :
                           value < 0.95 ? "Moderate Risk (0.85-0.95)" : "High Risk (>0.95)",
      "Waist-to-Height Ratio": value < 0.4 ? "Underweight (<0.4)" :
                              value < 0.5 ? "Healthy (0.4-0.5)" :
                              value < 0.6 ? "Overweight (0.5-0.6)" : "Obese (>0.6)",
      "Ponderal Index": value < 11 ? "Underweight (<11)" :
                       value < 14 ? "Normal (11-14)" : "Overweight (>14)",
      "ABSI": value < 0.07 ? "Low Risk (<0.07)" :
              value < 0.08 ? "Average Risk (0.07-0.08)" : "High Risk (>0.08)",
      "Body Roundness Index": value < 1 ? "Very Lean (<1)" :
                            value < 2 ? "Lean (1-2)" :
                            value < 3 ? "Average (2-3)" : "High (>3)",
      "Conicity Index": value < 1.2 ? "Low Risk (<1.2)" :
                       value < 1.35 ? "Moderate Risk (1.2-1.35)" : "High Risk (>1.35)",
      "Body Adiposity Index": value < 20 ? "Underweight (<20)" :
                            value < 25 ? "Normal (20-25)" :
                            value < 30 ? "Overweight (25-30)" : "Obese (>30)",
    };
    return ranges[metric] || "No range data";
  };

  const data = {
    "Primary Metrics": {
      "BMI (Standard)": `${results.bmi?.standard?.toFixed(1) || 'N/A'} - ${getRangeForMetric("BMI", results.bmi?.standard)}`,
      "BMI (Athletic)": `${results.bmi?.athletic?.toFixed(1) || 'N/A'}`,
      "BMI (Devine)": `${results.bmi?.devine?.toFixed(1) || 'N/A'}`,
      "Body Fat % (Navy)": `${results.bodyFat?.navy?.toFixed(1) || 'N/A'} - ${getRangeForMetric("Body Fat %", results.bodyFat?.navy)}`,
      "Body Fat % (Jackson)": `${results.bodyFat?.jackson?.toFixed(1) || 'N/A'}`,
      "Body Fat % (BMI Based)": `${results.bodyFat?.bmiBased?.toFixed(1) || 'N/A'}`,
      "Body Fat % (Army)": `${results.bodyFat?.army?.toFixed(1) || 'N/A'}`,
      "BMR": `${results.bmr?.bmr?.toFixed(0) || 'N/A'} kcal`,
      "TDEE": `${results.bmr?.tdee?.toFixed(0) || 'N/A'} kcal`,
      "Biological Age": `${results.biologicalAge?.toFixed(1) || 'N/A'} years`
    },
    "Body Composition": {
      "Lean Body Mass": `${results.leanBodyMass?.toFixed(1) || 'N/A'} kg`,
      "Fat Free Mass Index": `${results.fatFreeMassIndex?.toFixed(1) || 'N/A'}`,
      "Skeletal Muscle Mass": `${results.skeletalMuscleMass?.toFixed(1) || 'N/A'} kg`,
      "Body Fat Distribution": `${results.bodyFatDistribution?.toFixed(2) || 'N/A'}`,
      "Frame Size": results.frameSize || 'N/A',
      "Lean Mass Index": `${results.leanMassIndex?.toFixed(2) || 'N/A'} - ${getRangeForMetric("Lean Mass Index", results.leanMassIndex)}`
    },
    "Body Indices": {
      "Ponderal Index": `${results.ponderalIndex?.metric?.toFixed(2) || 'N/A'} - ${getRangeForMetric("Ponderal Index", results.ponderalIndex?.metric)}`,
      "ABSI": `${results.absi?.metric?.toFixed(3) || 'N/A'} - ${getRangeForMetric("ABSI", results.absi?.metric)}`,
      "Body Roundness Index": `${results.bodyRoundnessIndex?.metric?.toFixed(2) || 'N/A'} - ${getRangeForMetric("Body Roundness Index", results.bodyRoundnessIndex?.metric)}`,
      "Body Adiposity Index": `${results.bodyAdiposityIndex?.toFixed(2) || 'N/A'} - ${getRangeForMetric("Body Adiposity Index", results.bodyAdiposityIndex)}`,
      "Conicity Index": `${results.conicityIndex?.toFixed(3) || 'N/A'} - ${getRangeForMetric("Conicity Index", results.conicityIndex)}`
    },
    "Health Ratios": {
      "Waist-to-Hip Ratio": `${results.waistToHip?.toFixed(3) || 'N/A'} - ${getRangeForMetric("Waist-to-Hip Ratio", results.waistToHip)}`,
      "Waist-to-Height Ratio": `${results.waistToHeightRatio?.toFixed(3) || 'N/A'} - ${getRangeForMetric("Waist-to-Height Ratio", results.waistToHeightRatio)}`
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
    doc.setFontSize(16);
    doc.setTextColor(41, 128, 185);
    doc.text('Health Metrics Report', 14, 15);
    
    // Date
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 20);

    let startY = 25;
    
    // Configure table settings for full-page layout
    const tableConfig = {
      startY,
      head: [['Metric', 'Value']],
      styles: {
        fontSize: 7,
        cellPadding: 1,
        overflow: 'linebreak' as const,
        cellWidth: 'auto' as const
      },
      headStyles: {
        fillColor: [41, 128, 185] as [number, number, number],
        textColor: 255,
        fontSize: 8,
        fontStyle: 'bold' as const,
        cellPadding: 2,
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 110 }
      },
      margin: { left: 14, right: 14 },
      tableWidth: 182
    };

    // Add each section to the PDF
    Object.entries(data).forEach(([section, metrics], index) => {
      const tableData = Object.entries(metrics).map(([key, value]) => [key, value]);
      
      // Add section header
      doc.setFontSize(9);
      doc.setTextColor(41, 128, 185);
      doc.text(section, 14, startY - 3);
      
      // Add table
      autoTable(doc, {
        ...tableConfig,
        startY,
        body: tableData,
      });
      
      startY = (doc as any).lastAutoTable.finalY + 5;
    });

    doc.save('health-metrics.pdf');
  }
};