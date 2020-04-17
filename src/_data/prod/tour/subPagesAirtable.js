const base = require('../../../utils/airtable.js');
const fetchData = require('../../../utils/airtableDataController.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData(base('Gigs'), 'Default', 'Status = "Definitiv"');

  const returnArray = [];

  const constructBaseFields = (data) => {
    return {
      title: data['Name'],
      venue: Array.isArray(data['Lokal']) ? data['Lokal'][0] : '',
      doors: data['Türöffnung'],
      start: data['Start'],
      end: data['End'],
      pricePreSale: data['Ticket Preis (Vorverkauf)'],
      priceBoxOffice: data['Ticket Preis (Abendkasse)'],
      ticketUrl: data['Ticket URL'],
      slug: data['Slug']
    };
  };

  const responseFormattedDE = response.map((item) => {
    return { ...constructBaseFields(item.fields), lang: 'de-ch' };
  });

  const responseFormattedEN = response.map((item) => {
    return { ...constructBaseFields(item.fields), lang: 'en-gb' };
  });

  responseFormattedDE.map(item => returnArray.push(item));
  responseFormattedEN.map(item => returnArray.push(item));

  saveSeed(returnArray, `${__dirname}/../../dev/tour/subPagesAirtable.json`);
  return returnArray;
}
