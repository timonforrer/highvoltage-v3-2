const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData('music');
  saveSeed(response, `${__dirname}/../../dev/music/subPagesPrismic.json`);
  return response;
};
