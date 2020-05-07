const SpotifyWebApi = require('spotify-web-api-node');

let config = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_KEY
}

let getAuthorizedApi = async () => {
  let spotifyApi = new SpotifyWebApi(config);
  let grantResponse = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(grantResponse.body.access_token);
  return spotifyApi;
}

class Track {
  constructor(data) {
    this.index = data.track_number;
    this.name = data.name;
    this.duration = data.duration_ms;
    this.url = data.preview_url
  }
}

module.exports = {
  getAuthorizedApi,
  Track
}
