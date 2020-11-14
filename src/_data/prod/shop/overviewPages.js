const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData('shop');
  saveSeed(response, `${__dirname}/../../dev/shop/overviewPages.json`);
  return response;
}