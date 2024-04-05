// task 1
const tableParsing = (fileContentStr) => {
  const [keysArr, ...dataArr] = fileContentStr
    .split('\n')
    .filter((str) => str !== '')
    .map((str) => str.split(';'));

  const objArr = dataArr
    .map((valuesArr) => valuesArr.reduce((acc, value, i) => {
      acc[keysArr[i]] = value;
      return acc;
    }, {}));

  const meanRatingObjArr = objArr.map((obj) => {
    const properKeysArr = keysArr.filter((key) => key.endsWith('_rating'));
    const sum = properKeysArr.reduce((acc, key) => acc + Number(obj[key]), 0);
    return {
      name: obj.name,
      deveoper: obj.developer,
      mean: sum / properKeysArr.length,
    };
  });
  const topMesObj = meanRatingObjArr
    .sort(({ mean1 }, { mean2 }) => mean2 - mean1)
    .at(0);

  console.log(`General top messenger: ${topMesObj.name}, Owner: ${topMesObj.developer}`);
};

// task 2
const candidateAssessment = (/* content */) => {

};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
