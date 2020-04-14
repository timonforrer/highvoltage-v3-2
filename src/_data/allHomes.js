const { prismicQuery } = require('../utils/prismic.js');

const getAllHomes = async () => {
  let allHomes = await prismicQuery('home');
  return allHomes
}

module.exports = getAllHomes;
