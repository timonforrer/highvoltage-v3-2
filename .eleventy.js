require('dotenv').config();

const PrismicDOM = require('prismic-dom');
const getYoutubeIDHelper = require('get-youtube-id');

const assetHandler = require('./src/utils/asset.js');
const convertMs = require('./src/utils/convertMs.js');
const filterContentByProductGroup = require('./src/utils/filterContentByProductGroup.js');
const htmlDate = require('./src/utils/htmlDate.js');
const imageOptimisation = require('./src/utils/imageOptimisation.js');
const javascriptShortCode = require('./src/utils/javascript.js');
const toLocaleString = require('./src/utils/toLocaleString.js');
const asset = require('./src/utils/asset.js');

module.exports = function(config) {

  let env = process.env.ELEVENTY_ENV;

  config.setQuietMode(true);

  config.addNunjucksAsyncShortcode('image', async (image) => imageOptimisation(image.src, image.alt, image.attributes));

  config.addFilter('renderAsHTML', (value) => PrismicDOM.RichText.asHtml(value));
  config.addFilter('renderAsText', (value) => PrismicDOM.RichText.asText(value));
  config.addFilter('convertMs', (value) => convertMs(value));
  config.addFilter('htmlDate', (value) => htmlDate(value));
  config.addFilter('toLocaleString', (date, lang) => toLocaleString(date,lang));
  config.addFilter('toLowerCase', (value) => value.toLowerCase());
  config.addFilter('getYoutubeID', (value) => getYoutubeIDHelper(value));
  config.addFilter('contentFilter', (prismicInput, airtableInput) => filterContentByProductGroup(prismicInput, airtableInput));

  config.addWatchTarget('./src/scss/');
  config.addPassthroughCopy('./src/fonts');
  config.addPassthroughCopy('./src/static');
  config.addPassthroughCopy({'./src/unregister-sw.js': './sw.js'});

  // TODO: unify shortcodes as in twelvety
  javascriptShortCode(config);
  config.addShortcode('asset', assetHandler);

  config.setTemplateFormats([
    'njk',
    '11ty.js'
  ]);

  env = (env=='seed') ? 'prod' : env;

  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: `_data/${env}`
    }
  };
};
