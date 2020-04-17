const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData('tour');
  saveSeed(response, `${__dirname}/../../dev/tour/overviewPages.json`);
  return response;
};
