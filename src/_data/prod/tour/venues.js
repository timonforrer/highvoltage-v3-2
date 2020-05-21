const base = require('../../../utils/airtable.js');
const fetchData = require('../../../utils/airtableDataController.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData(base('Lokale'), 'Default');

  class Venue {
    constructor(data, id) {
      this.id = id
      this.name = data['Name'];
      this.street = data['Strasse / Nr'];
      this.zip = data['Postleitzahl'];
      this.city = data['Stadt'];
      this.province = data['Kanton'];
      this.country = data['Land'];
      this.mapsSearchByName = data['Maps-Suche mit Lokalname'];
    }
  }

  const responseFormatted = await response.map(item => new Venue(item.fields, item.id));

  saveSeed(responseFormatted, `${__dirname}/../../dev/tour/venues.json`);
  return responseFormatted;
}
