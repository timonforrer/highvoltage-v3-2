const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData('gallery');
  saveSeed(response, `${__dirname}/../../dev/gallery/overviewPages.json`);
  return response;
};
