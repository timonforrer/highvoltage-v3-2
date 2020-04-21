const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData('contact');
  saveSeed(response, `${__dirname}/../../dev/contact/overviewPages.json`);
  return response;
};
