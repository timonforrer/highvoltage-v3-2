const { prismicQuery } = require('../utils/prismic.js');

const getAllMusic = async () => {
  let allMusic = await prismicQuery('music');
  return allMusic;
}

module.exports = getAllMusic;
