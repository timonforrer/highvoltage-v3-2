const { prismicQuery } = require('../utils/prismic.js');

const getAllMusic = async () => {
  let allMusic = await prismicQuery('music');
  return {
    de: allMusic.filter((item) => item.lang === "de-ch"),
    en: allMusic.filter((item) => item.lang === "en-gb")
  };
}

module.exports = getAllMusic;
