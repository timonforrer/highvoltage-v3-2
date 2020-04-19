const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData('gig');
  saveSeed(response, `${__dirname}/../../dev/tour/subPagesPrismic.json`);
  return response;
};