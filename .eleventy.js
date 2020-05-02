require('dotenv').config();

const PrismicDOM = require('prismic-dom');
const getYoutubeIDHelper = require('get-youtube-id');

module.exports = function(config) {

  let env = process.env.ELEVENTY_ENV;

  config.addFilter('renderAsHTML', (value) => PrismicDOM.RichText.asHtml(value));
  config.addFilter('renderAsText', (value) => PrismicDOM.RichText.asText(value));
  config.addFilter('htmlDate', (value) => {
    return new Date(value).toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' });
  });
  config.addFilter('getYoutubeID', (value) => getYoutubeIDHelper(value));

  config.addWatchTarget('./src/scss/');
  config.addPassthroughCopy('./src/fonts');

  config.setTemplateFormats([
    'njk',
    '11ty.js'
  ]);

  env = (env=='seed') ? 'prod' : env

  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: `_data/${env}`
    }
  };
};
