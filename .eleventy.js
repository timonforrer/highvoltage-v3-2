const PrismicDOM = require('prismic-dom');

module.exports = function(config) {

  config.addFilter('log', (value) => console.log(value));

  config.addFilter('renderText', (value) => PrismicDOM.RichText.asHtml(value));

  config.addFilter('localeToPrefix', (value) => {
    let mainLocale = value.substring(0,2);
    if (mainLocale === 'de') {
      return '';
    } else {
      return mainLocale;
    }
  });

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };

};
