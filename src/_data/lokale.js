const base = require('../utils/airtable.js');
const fetchData = require('../utils/airtableDataController.js');

const getAllVenues = () => {
  return fetchData.getAirtableRecords(base('Lokale'), 'Default');
};

module.exports = getAllVenues;
