const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  let options = {
    'fetchLinks': [
      'music.title',
      'music.cover_photo',
      'music.providers',
    ]
  }
  const response = await fetchData('home', options);
  saveSeed(response, `${__dirname}/../../dev/home/overviewPages.json`);
  return response;
};
