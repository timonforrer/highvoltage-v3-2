module.exports = function(config) {
  config.addFilter('localeToPrefix', (value) => {
    let mainLocale = value.substring(0,1);
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
