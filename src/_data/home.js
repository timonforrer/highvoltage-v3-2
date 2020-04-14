const { prismicQuery } = require('../utils/prismic.js');

const getHome = async () => {
  const allHomes = await prismicQuery('home');
  return {
    DE: allHomes.filter((item) => item.lang === "de-ch")[0],
    EN: allHomes.filter((item) => item.lang === "en-gb")[0]
  }
}

module.exports = getHome;
