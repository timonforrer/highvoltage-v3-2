const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData('music');
  const returnArraySorted = response.sort((a, b) => {
    a = new Date(a.data.release_date);
    b = new Date(b.data.release_date);
    return a>b ? -1 : a<b ? 1 : 0;
  });
  saveSeed(returnArraySorted, `${__dirname}/../../dev/music/subPagesPrismic.json`);
  return returnArraySorted;
};
