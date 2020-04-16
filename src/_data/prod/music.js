const { prismicQuery } = require('../../utils/prismic.js');
const saveSeed = require('../../utils/saveSeed.js');

const getAllMusic = async () => {
  let allMusic = await prismicQuery('music');

  const returnObject = {
    de: allMusic.filter((item) => item.lang === "de-ch"),
    en: allMusic.filter((item) => item.lang === "en-gb")
  }

  saveSeed(JSON.stringify(returnObject), `${__dirname}/../dev/music.json`);
  return returnObject;
}

module.exports = getAllMusic;
