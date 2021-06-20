const fetchData = require('../../../utils/prismic.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  let options = {
    'fetchLinks': [
      'music.providers',
      'music.songs',
      'music.body'
    ]
  }
  const response = await fetchData('product', options);
  saveSeed(response, `${__dirname}/../../dev/shop/subPagesPrismic.json`);
  return response;
}
