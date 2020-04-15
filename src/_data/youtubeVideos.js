const fetch = require('node-fetch');

const getAllYoutubeVideos = async () => {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUdARchfQvlOBcMNZynTPRCg&key=${process.env.YOUTUBE_API_KEY}&part=snippet&maxResults=50`
  const response = await fetch(url);
  const json = await response.json();

  const formattedVideos = json.items.map((item) => {
    const data = item.snippet;
    return {
      id: data.resourceId.videoId,
      publishedAt: data.publishedAt,
      title: data.title,
      description: data.description,
      thumbnails: { ...data.thumbnails }
    };
  });
  return formattedVideos;
}

module.exports = getAllYoutubeVideos;