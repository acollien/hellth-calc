import { saveAs } from 'file-saver';

export const exportHealthResults = (results: any) => {
  console.log('Exporting health results:', results);
  
  const formatResult = (value: any) => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value;
  };

  const formattedResults = {
    basicMetrics: {
      BMI: formatResult(results.bmi?.standard),
      'Body Fat %': formatResult(results.bodyFat?.navy),
      'Basal Metabolic Rate': `${formatResult(results.bmr?.bmr)} calories/day`,
    },
    bodyComposition: {
      'Lean Body Mass': formatResult(results.leanBodyMass),
      'Fat Free Mass Index': formatResult(results.fatFreeMassIndex),
      'Skeletal Muscle Mass': formatResult(results.skeletalMuscleMass),
    },
    bodyIndices: {
      'Ponderal Index': formatResult(results.ponderalIndex?.metric),
      'ABSI': formatResult(results.absi?.metric),
      'Body Roundness Index': formatResult(results.bodyRoundnessIndex?.metric),
      'Waist to Height Ratio': formatResult(results.waistToHeightRatio),
    },
    advancedMetrics: {
      'Lean Mass Index': formatResult(results.leanMassIndex),
      'Body Adiposity Index': formatResult(results.bodyAdiposityIndex),
      'Conicity Index': formatResult(results.conicityIndex),
    },
    exportDate: new Date().toLocaleDateString(),
    version: '1.0'
  };

  const blob = new Blob([JSON.stringify(formattedResults, null, 2)], {
    type: 'application/json'
  });

  saveAs(blob, `health-metrics-${new Date().toISOString().split('T')[0]}.json`);
};