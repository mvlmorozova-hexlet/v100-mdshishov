// task 1
const tableParsing = (fileContent) => {
  const [keys, ...data] = fileContent
    .split('\n')
    .filter((str) => str !== '')
    .map((str) => str.split(';'));

  const objs = data
    .map((values) => values.reduce((acc, value, i) => {
      acc[keys[i]] = value;
      return acc;
    }, {}));

  const meanRatingObjs = objs.map((obj) => {
    const properKeys = keys.filter((key) => key.endsWith('_rating'));
    const sum = properKeys.reduce((acc, key) => acc + Number(obj[key]), 0);
    return {
      name: obj.name,
      developer: obj.developer,
      mean: sum / properKeys.length,
    };
  });
  const topMesObj = meanRatingObjs
    .sort(({ mean: a }, { mean: b }) => b - a)
    .at(0);

  console.log(`General top messenger: ${topMesObj.name}, Owner: ${topMesObj.developer}`);

  const indiaDownloads = objs
    .map(({ downloads_in_India: value }) => Number(value))
    .sort((a, b) => a - b);

  console.log(`Download count: Max count: ${indiaDownloads.at(-1)}, Min count: ${indiaDownloads.at(0)}`);

  const top3Australia = objs
    .sort(({ downloads_in_Australia: a }, { downloads_in_Australia: b }) => Number(a) - Number(b))
    .slice(-3)
    .map(({ name }) => name)
    .sort();

  console.log(`Top-3 Australia: ${top3Australia.join(', ')}`);

  const meanGlobalDownloads = objs.map((obj) => {
    const properKeys = keys.filter((key) => key.startsWith('downloads_in_'));
    const sum = properKeys.reduce((acc, key) => acc + Number(obj[key]), 0);
    return {
      name: obj.name,
      mean: sum / properKeys.length,
    };
  });
  const topDownloadsNames = meanGlobalDownloads
    .sort(({ mean: a }, { mean: b }) => b - a)
    .map(({ name }) => name);

  console.log(`Top downloads: ${topDownloadsNames.join(', ')}`);

  const appsOwnCount = objs.reduce((acc, { developer }) => {
    acc[developer] = (acc[developer] ?? 0) + 1;
    return acc;
  }, {});
  const topOwner = Object.entries(appsOwnCount)
    .sort(([, a], [, b]) => b - a)
    .at(0)
    .at(0);

  console.log(`Top owner: ${topOwner}`);
};

// task 2
const candidateAssessment = (/* content */) => {

};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
