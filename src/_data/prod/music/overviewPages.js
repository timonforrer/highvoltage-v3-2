const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData('musicoverviewpage');
  saveSeed(response, `${__dirname}/../../dev/music/overviewPages.json`);
  return response;
};
