const nav = require('../nav.json');
const saveSeed = require('../../utils/saveSeed.js');

module.exports = () => {
  saveSeed(nav, `${__dirname}/../dev/nav.json`);
  return nav;
}