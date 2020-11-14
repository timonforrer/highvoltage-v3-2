const moment = require('moment');

module.exports = (date, lang) => {
  return moment(date).locale(lang).format('llll');
}
