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
    .sort(({ mean: a }, { mean: b }) => a - b)
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
const candidateAssessment = (fileContent) => {
  const lines = fileContent.split('\n');

  const name = lines.at(0);
  const position = lines.at(1);
  // const contacts = lines.at(2).split(', ');
  // const location = lines.at(3).slice(10);
  const socials = lines.at(4).slice(9).split(', ');
  const stack = lines.at(5).slice(7).split(', ');
  const experience = lines.at(6).slice(12).split('; ');
  const education = lines.at(7).slice(11).split('; ');

  console.log(`Job seeker: ${name}, ${position}`);

  const necessaryFrameworks = [
    'React', 'Angular', 'Vue.js', 'JQuery', 'Backbone.js', 'Node.js', 'Ember.js', 'Meteor',
  ].map((str) => str.toLowerCase());
  const stackCount = stack.reduce((acc, str) => {
    if (necessaryFrameworks.includes(str.toLowerCase())) return acc + 1;
    return acc;
  }, 0);

  console.log(`Required stack: ${stackCount}`);

  const github = socials
    .filter((str) => str.startsWith('github.com/'))
    .at(0)
    .replace('github.com/', '');
  console.log(`GitHub nickname: ${github}`);

  const workPeriods = experience
    .map((str) => str.split(', ')
      .at(1)
      .split(' - '))
    .sort(([a], [b]) => Number(a.split('.').at(-1)) - Number(b.split('.').at(-1)));
  const years = workPeriods.map((period) => period.map((date) => Number(date.split('.').at(-1))));
  const months = workPeriods.map((period) => period.map((date) => Number(date.split('.').at(1))));
  const yearsDiff = years.at(-1).at(1) - years.at(0).at(0);
  const monthsDiff = months.at(-1).at(1) - months.at(0).at(0);

  console.log(`Experience: ${yearsDiff} years ${monthsDiff} months`);

  const eduPlaces = education.map((str) => str.split(', ').at(0)).sort();

  console.log(`Education: ${eduPlaces.join(', ')}`);
};

// task 3
const actorRating = (fileContent) => {
  const keys = ['type', 'year', 'prize', 'category', 'film'];
  const data = fileContent
    .split('\n')
    .filter((str) => str !== '')
    .map((str) => str.split(' — '));

  const objs = data
    .map((values) => values.reduce((acc, value, i) => {
      acc[keys[i]] = value;
      return acc;
    }, {}));

  const awards = objs.reduce((acc, { type }) => {
    if (type === 'Награда') acc[0] += 1;
    if (type === 'Номинация') acc[1] += 1;
    return acc;
  }, [0, 0]);

  console.log(`Awards: Rewards: ${awards.at(0)}, Nominations: ${awards.at(1)}`);

  const movies2003 = objs
    .filter(({ year }) => year === '2003')
    .map(({ film }) => film)
    .reduce((acc, film) => {
      if (!acc.includes(film)) acc.push(film);
      return acc;
    }, []);

  console.log(`Movies 2003: ${movies2003.sort().join(', ')}`);

  const rewardsPercent = (awards.at(0) * 100) / objs.length;

  console.log(`Rewards percent: ${rewardsPercent.toFixed(0)}%`);

  const filmAwards = objs.reduce((acc, { film }) => {
    acc[film] = (acc[film] ?? 0) + 1;
    return acc;
  }, {});
  const mostAwards = Math.max(...Object.entries(filmAwards).map(([, value]) => Number(value)));
  const mostSuccessful = Object.entries(filmAwards)
    .filter(([, value]) => Number(value) === mostAwards)
    .map(([key]) => key)
    .sort();
  console.log(`Most successful movie: ${mostSuccessful.at(0)}`);

  const prizesCount = objs.reduce((acc, { prize }) => {
    acc[prize] = (acc[prize] ?? 0) + 1;
    return acc;
  }, {});
  const prizesSorted = Object.entries(prizesCount).sort(([, a], [, b]) => Number(b) - Number(a));
  const pet = Object.entries(prizesCount)
    .filter(([, value]) => value === prizesSorted.at(0).at(1))
    .map(([key]) => key)
    .sort();
  const outsider = Object.entries(prizesCount)
    .filter(([, value]) => value === prizesSorted.at(-1).at(1))
    .map(([key]) => key)
    .sort();
  console.log(`Awards statisctics: Award's pet: ${pet.at(0)}, Award's outsider: ${outsider.at(0)}`);
};

export { tableParsing, candidateAssessment, actorRating };
