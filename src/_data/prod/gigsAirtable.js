const base = require('../../utils/airtable.js');
const fetchData = require('../../utils/airtableDataController.js');
const saveSeed = require('../../utils/saveSeed.js');

const getAllGigs = async () => {

  const allGigs = await fetchData.getAirtableRecords(base('Gigs'), 'Default', 'Status = "Definitiv"');

  const allGigsFormatted = allGigs.map((item) => {
    const data = item.fields;
    return {
      title: data.Name,
      venue: Array.isArray(data.Lokal) ? data.Lokal[0] : '',
      doors: data['Türöffnung'],
      start: data.Start,
      end: data.End,
      pricePreSale: data['Ticket Preis (Vorverkauf)'],
      priceBoxOffice: data['Ticket Preis (Abendkasse)'],
      ticketUrl: data['Ticket URL'],
      slug: data.Slug
    };
  });

  const upcoming = allGigsFormatted.filter((item) => new Date(item.start) >= new Date());
  const past = allGigsFormatted.filter((item) => new Date(item.start) <= new Date());

  const returnObject = {
    allGigsFormatted,
    upcoming,
    past
  }

  saveSeed(JSON.stringify(returnObject), `${__dirname}/../dev/gigsAirtable.json`);
  return returnObject
};

module.exports = getAllGigs;
