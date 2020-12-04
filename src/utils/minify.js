const uglify = require('uglify-js')
const beautify = require('js-beautify')

// Use beautify in development
// Options: https://github.com/beautify-web/js-beautify
const BEAUTIFY_OPTIONS = {
  extra_liners: [],
  indent_inner_html: true,
  indent_size: 2,
  max_preserve_newlines: 1
};

function minifyJS(content) {
  if (process.env.ELEVENTY_ENV === 'prod') {
    // uglify
    // Options: https://github.com/mishoo/UglifyJS
    return uglify.minify(content).code
  } else {
    return beautify.js(content, BEAUTIFY_OPTIONS)
  };
};

module.exports = {
  js: minifyJS,
};
