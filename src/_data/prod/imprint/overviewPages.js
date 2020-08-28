const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData('imprint');
  saveSeed(response, `${__dirname}/../../dev/imprint/overviewPages.json`);
  return response;
};
