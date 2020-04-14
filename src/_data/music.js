const { prismicQuery } = require('../utils/prismic.js');

const getAllMusic = async () => {
  let allMusic = await prismicQuery('music');
  return {
    DE: allMusic.filter((item) => item.lang === "de-ch"),
    EN: allMusic.filter((item) => item.lang === "en-gb")
  };
}

module.exports = getAllMusic;
