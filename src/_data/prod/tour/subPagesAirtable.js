const base = require('../../../utils/airtable.js');
const fetchData = require('../../../utils/airtableDataController.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData(base('Gigs'), 'Default', 'Status = "Definitiv"');

  const returnArray = [];

  const constructBaseFields = (data) => {
    return {
      title: data['Name'],
      upcoming: new Date(data['Türöffnung']) > new Date(),
      venue: Array.isArray(data['Lokal']) ? data['Lokal'][0] : '',
      doors: data['Türöffnung'],
      start: data['Start'],
      end: data['End'],
      pricePreSale: data['Ticket Preis (Vorverkauf)'],
      priceBoxOffice: data['Ticket Preis (Abendkasse)'],
      ticketUrl: data['Ticket URL'],
      slug: data['Slug'],
      lastMod: data['last_mod']
    };
  };

  // Todo: add *actual* localised fields to the response..

  const responseFormattedDE = response.map((item) => {
    return { ...constructBaseFields(item.fields), lang: 'de-ch' };
  });

  const responseFormattedEN = response.map((item) => {
    return { ...constructBaseFields(item.fields), lang: 'en-gb' };
  });

  responseFormattedDE.map(item => returnArray.push(item));
  responseFormattedEN.map(item => returnArray.push(item));

  const returnArraySorted = returnArray.sort((a, b) => {
    a = new Date(a.start);
    b = new Date(b.start);
    return a>b ? -1 : a<b ? 1 : 0;
  })

  saveSeed(returnArraySorted, `${__dirname}/../../dev/tour/subPagesAirtable.json`);
  return returnArraySorted;
}
