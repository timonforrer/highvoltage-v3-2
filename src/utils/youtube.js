const fetch = require('node-fetch');

const getVideoList = async () => {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUdARchfQvlOBcMNZynTPRCg&key=${process.env.YOUTUBE_API_KEY}&part=contentDetails&maxResults=50`;
  const response = await fetch(url);
  const json = await response.json();

  const relevantContent = json.items.map(item => item.contentDetails.videoId);
  return relevantContent.toString();
};

const localisedFields = (item, lang) => {
  return {
    lang: lang == 'de' ? 'de-ch' : 'en-gb',
    title: item.localizations ? item.localizations[lang].title : item.snippet.title,
    description: item.localizations ? item.localizations[lang].description : item.snippet.description
  }
}

const baseFields = (item) => {
  return {
    id: item.id,
    publishedAt: item.snippet.publishedAt,
    thumbnails: item.snippet.thumbnails
  }
}

const generateLocalisedDocuments = (items) => {
  const returnArray = [];

  const responseFormattedDE = items.map((item) => {
    return { ...baseFields(item), ...localisedFields(item, 'de') };
  });
  const responseFormattedEN = items.map((item) => {
    return { ...baseFields(item), ...localisedFields(item, 'en') }
  })

  returnArray.push(responseFormattedDE);
  returnArray.push(responseFormattedEN);

  return returnArray;
}

module.exports = {
  getVideoList,
  generateLocalisedDocuments
}