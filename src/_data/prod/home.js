const { prismicQuery } = require('../../utils/prismic.js');
const saveSeed = require('../../utils/saveSeed.js');

const getHome = async () => {
  const allHomes = await prismicQuery('home');

  const returnObject = {
    de: allHomes.filter((item) => item.lang === "de-ch")[0],
    en: allHomes.filter((item) => item.lang === "en-gb")[0]
  }

  saveSeed(JSON.stringify(returnObject), `${__dirname}/../dev/home.json`);
  return returnObject
}

module.exports = getHome;
