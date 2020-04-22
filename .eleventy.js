require('dotenv').config();

const PrismicDOM = require('prismic-dom');

module.exports = function(config) {

  let env = process.env.ELEVENTY_ENV;

  config.addFilter('renderAsHTML', (value) => PrismicDOM.RichText.asHtml(value));
  config.addFilter('renderAsText', (value) => PrismicDOM.RichText.asText(value));
  config.addFilter('htmlDate', (value) => {
    return new Date(value).toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' });
  });

  env = (env=='seed') ? 'prod' : env

  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: `_data/${env}`
    }
  };
};
