const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData('home');
  saveSeed(response, `${__dirname}/../../dev/home/overviewPages.json`);
  return response;
}
