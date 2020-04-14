require('dotenv').config();

const PrismicDOM = require('prismic-dom');

module.exports = function(config) {

  config.addFilter('log', (value) => console.log(value));
  config.addFilter('renderAsHTML', (value) => PrismicDOM.RichText.asHtml(value));
  config.addFilter('renderAsText', (value) => PrismicDOM.RichText.asText(value));

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };

};
