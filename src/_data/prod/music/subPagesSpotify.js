const { getAuthorizedApi, Track } = require('../../../utils/spotify.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  let authorizedApi = await getAuthorizedApi();

  // Get all albums by Voltage Arc
  let albums = await authorizedApi.getArtistAlbums('1rKjmJo7SzQRVREgJKjvtZ');

  // "Hydrate" albums w/ Tracks
  let albumTracks = await Promise.all(

    albums.body.items.map(async item => {
      let tracks = (await authorizedApi.getAlbumTracks(item.id)).body.items;
      let response = {
        albumName: item.name,
        tracks: tracks.map(data => new Track(data))
      };
      return response;
    })
  );

  saveSeed(albumTracks, `${__dirname}/../../dev/music/subPagesSpotify.json`);
  return albumTracks;
};
