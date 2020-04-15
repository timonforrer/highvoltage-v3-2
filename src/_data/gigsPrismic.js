const { prismicQuery } = require('../utils/prismic.js');

const getAllGigs = async () => {
  const allGigs = await prismicQuery('gig');
  return {
    de: allGigs.filter((item) => item.lang === "de-ch"),
    en: allGigs.filter((item) => item.lang === "en-gb")
  }
}

module.exports = getAllGigs;
