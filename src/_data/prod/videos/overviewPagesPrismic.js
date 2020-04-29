const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData('videos');
  saveSeed(response, `${__dirname}/../../dev/videos/overviewPagesPrismic.json`);
  return response;
};
