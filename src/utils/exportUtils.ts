import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportResults = (results: any, format: 'pdf' | 'json') => {
  if (!results) return;

  console.log("Full results object received in exportUtils:", results);

  const getRangeForMetric = (metric: string, value: number): string => {
    const ranges: { [key: string]: string } = {
      "BMI (Standard)": value < 18.5 ? "Underweight (<18.5)" : 
                       value < 25 ? "Normal (18.5-24.9)" :
                       value < 30 ? "Overweight (25-29.9)" : "Obese (≥30)",
      "BMI (Athletic)": value < 17 ? "Underweight (<17)" :
                       value < 23 ? "Normal (17-23)" :
                       value < 28 ? "Overweight (23-28)" : "Obese (≥28)",
      "BMI (Devine)": value < 18.5 ? "Underweight (<18.5)" :
                      value < 25 ? "Normal (18.5-24.9)" :
                      value < 30 ? "Overweight (25-29.9)" : "Obese (≥30)",
      "BMI (BMI Based)": value < 18.5 ? "Underweight (<18.5)" :
                         value < 25 ? "Normal (18.5-24.9)" :
                         value < 30 ? "Overweight (25-29.9)" : "Obese (≥30)",
      "Body Fat % (Navy)": value < 10 ? "Essential Fat (<10%)" :
                          value < 20 ? "Athletes (10-20%)" :
                          value < 30 ? "Fitness (20-30%)" : "Excess (>30%)",
      "Body Fat % (Jackson)": value < 10 ? "Essential Fat (<10%)" :
                             value < 20 ? "Athletes (10-20%)" :
                             value < 30 ? "Fitness (20-30%)" : "Excess (>30%)",
      "Body Fat % (BMI Based)": value < 10 ? "Essential Fat (<10%)" :
                               value < 20 ? "Athletes (10-20%)" :
                               value < 30 ? "Fitness (20-30%)" : "Excess (>30%)",
      "Body Fat % (Army)": value < 10 ? "Essential Fat (<10%)" :
                          value < 20 ? "Athletes (10-20%)" :
                          value < 30 ? "Fitness (20-30%)" : "Excess (>30%)",
      "BMR": value < 1200 ? "Low (<1200 kcal/day)" :
             value < 1800 ? "Normal (1200-1800 kcal/day)" :
             value < 2200 ? "High (1800-2200 kcal/day)" : "Very High (>2200 kcal/day)",
      "TDEE": value < 1500 ? "Low (<1500 kcal/day)" :
              value < 2500 ? "Normal (1500-2500 kcal/day)" :
              value < 3000 ? "High (2500-3000 kcal/day)" : "Very High (>3000 kcal/day)",
      "Lean Body Mass": value < 40 ? "Below Average (<40)" :
                        value < 60 ? "Average (40-60)" :
                        value < 80 ? "Above Average (60-80)" : "High (>80)",
      "Body Fat Distribution": value < 0.8 ? "Healthy (<0.8)" :
                             value < 0.9 ? "Moderate Risk (0.8-0.9)" : "High Risk (>0.9)",
      "Frame Size": value === 'small' ? "Small Frame" :
                   value === 'medium' ? "Medium Frame" : "Large Frame",
      "Robinson Formula": value < 45 ? "Underweight (<45)" :
                         value < 60 ? "Normal (45-60)" :
                         value < 75 ? "Overweight (60-75)" : "Obese (>75)",
      "Miller Formula": value < 45 ? "Underweight (<45)" :
                       value < 60 ? "Normal (45-60)" :
                       value < 75 ? "Overweight (60-75)" : "Obese (>75)",
      "Devine Formula": value < 45 ? "Underweight (<45)" :
                       value < 60 ? "Normal (45-60)" :
                       value < 75 ? "Overweight (60-75)" : "Obese (>75)",
      "Athletic Formula": value < 50 ? "Underweight (<50)" :
                         value < 65 ? "Normal (50-65)" :
                         value < 80 ? "Overweight (65-80)" : "Obese (>80)",
      "BMI Based Range": value < 45 ? "Underweight (<45)" :
                        value < 60 ? "Normal (45-60)" :
                        value < 75 ? "Overweight (60-75)" : "Obese (>75)",
    };
    return ranges[metric] || "";
  };

  const formatValue = (value: any, metric: string, unit: string = ''): string => {
    if (value === null || value === undefined || isNaN(value)) return 'N/A';
    
    // Add units based on metric type
    if (metric.includes('Body Fat') || metric.includes('%')) {
      return `${value.toFixed(1)}%`;
    }
    if (metric.includes('BMR') || metric.includes('TDEE')) {
      return `${Math.round(value)} kcal/day`;
    }
    if (metric.includes('Weight') || metric.includes('Mass')) {
      return `${value.toFixed(1)} ${unit}`;
    }
    if (typeof value === 'number') return value.toFixed(2);
    return String(value);
  };

  const data = {
    "Primary Metrics": {
      "BMI (Standard)": results.bmi?.standard,
      "BMI (Athletic)": results.bmi?.athletic,
      "BMI (Devine)": results.bmi?.devine,
      "BMI (BMI Based)": results.bmi?.bmiBased,
      "Body Fat % (Navy)": results.bodyFat?.navy,
      "Body Fat % (Jackson)": results.bodyFat?.jackson,
      "Body Fat % (BMI Based)": results.bodyFat?.bmiBased,
      "Body Fat % (Army)": results.bodyFat?.army,
      "BMR": results.bmr?.bmr,
      "TDEE": results.bmr?.tdee,
      "Biological Age": results.biologicalAge,
      "Frame Size": results.frameSize
    },
    "Body Composition": {
      "Lean Body Mass": results.leanBodyMass,
      "Fat Free Mass Index": results.fatFreeMassIndex,
      "Skeletal Muscle Mass": results.skeletalMuscleMass,
      "Body Fat Distribution": results.bodyFatDistribution,
      "Frame Size": results.frameSize,
      "Lean Mass Index": results.leanMassIndex
    },
    "Body Indices": {
      "Ponderal Index": results.ponderalIndex?.metric,
      "ABSI": results.absi?.metric,
      "Body Roundness Index": results.bodyRoundnessIndex?.metric,
      "Body Adiposity Index": results.bodyAdiposityIndex,
      "Conicity Index": results.conicityIndex
    },
    "Health Ratios": {
      "Waist-to-Hip Ratio": results.waistToHip,
      "Waist-to-Height Ratio": results.waistToHeightRatio
    },
    "Ideal Weight Ranges": {
      "Robinson Formula": results.idealWeight?.robinson,
      "Miller Formula": results.idealWeight?.miller,
      "Devine Formula": results.idealWeight?.devine,
      "Athletic Formula": results.idealWeight?.athletic,
      "BMI Based Range": results.idealWeight?.bmiBased
    }
  };

  if (format === 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'health-metrics.json');
  } else {
    const doc = new jsPDF();
    const unit = results.unit || 'metric';
    const unitSymbol = unit === 'metric' ? 'kg' : 'lbs';
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(41, 128, 185);
    doc.text('Health Metrics Report', 14, 15);
    
    // Date with increased spacing
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 25);

    let startY = 40; // Increased spacing after date
    
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

    Object.entries(data).forEach(([section, metrics], index) => {
      // Section headers with increased prominence
      doc.setFontSize(16);
      doc.setTextColor(41, 128, 185);
      doc.setFont(undefined, 'bold');
      doc.text(section, 14, startY - 5);
      
      const tableData = Object.entries(metrics).map(([key, value]) => {
        const formattedValue = formatValue(value, key, unitSymbol);
        const range = getRangeForMetric(key, Number(value));
        return [key, formattedValue, range];
      }).filter(([_, value]) => value !== 'N/A');
      
      autoTable(doc, {
        ...tableConfig,
        startY,
        body: tableData,
      });
      
      startY = (doc as any).lastAutoTable.finalY + 20; // Increased spacing between sections
    });

    doc.save('health-metrics.pdf');
  }
};
