// Stolen from twelvety starter template
// https://github.com/gregives/Twelvety/blob/master/utils/shortcodes/javascript.js

const browserify = require('browserify');
const babel = require('@babel/core');
const babelPresetEnv = require('@babel/preset-env');
const outdent = require('outdent');

const { Readable } = require('stream');
const { rejects } = require('assert');
const { join } = require('path');

// bundle scripts with browserify
function bundleScripts(data) {
  return new Promise((resolve, reject) => {
    // Pass browserify a ReadableStream of the script
    let temp = browserify([Readable.from(data)]);

    // optimize using tinyify
    if(process.env.ELEVENTY_ENV == 'prod')
      temp = temp.plugin('tinyify');

    // bundle code for browser
    temp.bundle((error, buffer) => {
      if(error)
        reject(error);
      resolve(buffer);
    });
  });
};

module.exports = function(config) {
  // Each script is stored within an array for its given 'chunk' (whatever that means?)
  const SCRIPTS = {};

  // Store each script within its chunk
  // The chunk defaults to the URL of the current page
  config.addPairedShortcode('javascript', function(content, chunk = this.page.url) {
    // make shure the chunk exists
    if (!SCRIPTS.hasOwnProperty(chunk))
      SCRIPTS[chunk] = [];

    // remove leading spaces
    content = outdent.string(content);

    // add the scripts to the chunk if not already in it
    if (!SCRIPTS[chunk].includes(content))
      SCRIPTS[chunk].push(content);

    return '';
  });

  // render the scripts for given chunk
  config.addAsyncShortcode('script', async function(chunk = this.page.url) {
    // if there arent any scripts, return nothing
    if(!SCRIPTS.hasOwnProperty(chunk))
      return '';
    
    // wrap scripts in IIFE and join all the scripts in chunk
    const joined = SCRIPTS[chunk].map((data) => `;(() => {\n${data}\n})()`).join('\n');
    // bundle the scripts using browserify
    const bundled = await bundleScripts(joined);
    // use babel using babel-preset-env for compatibility
    return babel.transformSync(bundled, { presets: [babelPresetEnv] }).code;
  });

  // reset all scripts on re-runs
  config.on('beforeWatch', function() {
    for (const chunk in SCRIPTS) {
      delete SCRIPTS[chunk];
    };
  });
};