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
      developer: obj.developer,
      mean: sum / properKeysArr.length,
    };
  });
  const topMesObj = meanRatingObjArr
    .sort(({ mean: a }, { mean: b }) => b - a)
    .at(0);

  console.log(`General top messenger: ${topMesObj.name}, Owner: ${topMesObj.developer}`);

  const indiaDldsArr = objArr
    .map(({ downloads_in_India: value }) => Number(value))
    .sort((a, b) => a - b);

  console.log(`Download count: Max count: ${indiaDldsArr.at(-1)}, Min count: ${indiaDldsArr.at(0)}`);

  const australiaDldsSortArr = objArr
    .sort(({ downloads_in_Australia: a }, { downloads_in_Australia: b }) => Number(a) - Number(b));
  const top3AustraliaArr = australiaDldsSortArr
    .slice(-3)
    .map(({ name }) => name)
    .sort();

  console.log(`Top-3 Australia: ${top3AustraliaArr.join(', ')}`);
};

// task 2
const candidateAssessment = (/* content */) => {

};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
