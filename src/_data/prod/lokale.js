const base = require('../../utils/airtable.js');
const fetchData = require('../../utils/airtableDataController.js');
const saveSeed = require('../../utils/saveSeed.js');

const getAllVenues = async () => {
  const allVenues = await fetchData.getAirtableRecords(base('Lokale'), 'Default');

  saveSeed(JSON.stringify(allVenues), `${__dirname}/../dev/lokale.json`);
  return allVenues;
};

module.exports = getAllVenues;
