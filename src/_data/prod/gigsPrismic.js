const { prismicQuery } = require('../../utils/prismic.js');
const saveSeed = require('../../utils/saveSeed.js');

const getAllGigs = async () => {
  const allGigs = await prismicQuery('gig');

  const returnObject = {
    de: allGigs.filter((item) => item.lang === "de-ch"),
    en: allGigs.filter((item) => item.lang === "en-gb")
  }

  saveSeed(JSON.stringify(returnObject), `${__dirname}/../dev/gigsPrismic.json`);
  return returnObject
}

module.exports = getAllGigs;
