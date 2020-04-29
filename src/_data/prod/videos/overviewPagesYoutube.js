const fetch = require('node-fetch');
const saveSeed = require('../../../utils/saveSeed.js');
const { getVideoList, generateLocalisedDocuments } = require('../../../utils/youtube.js');

module.exports = async () => {
  const videoIDs = await getVideoList();
  const url = {
    base: `https://www.googleapis.com/youtube/v3/videos`,
    params: `?key=${process.env.YOUTUBE_API_KEY}&part=localizations,snippet&id=${videoIDs}`
  };

  const response = await fetch(`${url.base}${url.params}`);
  const json = await response.json();
  const localisedDocuments = generateLocalisedDocuments(json.items);
  saveSeed(localisedDocuments, `${__dirname}/../../dev/videos/overviewPagesYoutube.json`);
  return localisedDocuments;
};