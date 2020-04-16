require('dotenv').config();

const PrismicDOM = require('prismic-dom');

module.exports = function(config) {

  let env = process.env.ELEVENTY_ENV;

  config.addFilter('log', (value) => console.log(value));
  config.addFilter('renderAsHTML', (value) => PrismicDOM.RichText.asHtml(value));
  config.addFilter('renderAsText', (value) => PrismicDOM.RichText.asText(value));

  env = (env=='seed') ? 'prod' : env

  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: `_data/${env}`
    }
  };
};
