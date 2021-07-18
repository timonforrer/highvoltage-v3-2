// Code used from Phil Hawksworths 'EleventyOne' Starter Template

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

// the file name as an entry point for postcss compilation
// also used to define the output filename in our output /css folder.
const fileName = "main.css";

module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `../scss/${fileName}`);
    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath)
    };
  };

  async render ({ rawCss, rawFilepath }) {
    return await postcss([
      // require('postcss-comment'),
      require('precss'),
      require('postcss-import'),
      require('postcss-color-mix'),
      require('cssnano')
    ])
    .process(rawCss, { from: rawFilepath })
    .then(result => result.css);
  };
}