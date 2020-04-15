const base = require('../utils/airtable.js');
const fetchData = require('../utils/airtableDataController.js');

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
      price_pre_sale: data['Ticket Preis (Vorverkauf)'],
      price_box_office: data['Ticket Preis (Abendkasse)'],
      ticket_url: data['Ticket URL'],
      slug: data.Slug
    };
  });

  const upcoming = allGigsFormatted.filter((item) => new Date(item.start) >= new Date());
  const past = allGigsFormatted.filter((item) => new Date(item.start) <= new Date());

  return {
    allGigsFormatted,
    upcoming,
    past
  }
};

module.exports = getAllGigs;
