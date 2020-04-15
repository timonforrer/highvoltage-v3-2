const { prismicQuery } = require('../utils/prismic.js');

const getHome = async () => {
  const allHomes = await prismicQuery('home');
  return {
    de: allHomes.filter((item) => item.lang === "de-ch")[0],
    en: allHomes.filter((item) => item.lang === "en-gb")[0]
  }
}

module.exports = getHome;
