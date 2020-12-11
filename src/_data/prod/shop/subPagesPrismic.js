const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData('product');
  saveSeed(response, `${__dirname}/../../dev/shop/subPagesPrismic.json`);
  return response;
}