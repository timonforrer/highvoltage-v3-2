const base = require('../../../utils/airtableShop.js');
const fetchData = require('../../../utils/airtableDataController.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData(base('Products'), 'Default', '');

  const returnArray = [];

  const constructBaseFields = (data) => {
    return {
      productNumber: data['Product Number'],
      basePrice: data['Base Price'],
      prismicUID: data['prismicUID'],
      stock: data['Inventory']
    };
  };

  const responseFormattedDE = response.map(item => {
    return { ...constructBaseFields(item.fields), lang: 'de-ch' };
  });

  const responseFormattedEN = response.map(item => {
    return { ...constructBaseFields(item.fields), lang: 'en-gb' };
  });

  responseFormattedDE.map(item => returnArray.push(item));
  responseFormattedEN.map(item => returnArray.push(item));

  saveSeed(returnArray, `${__dirname}/../../dev/shop/subPagesAirtable.json`);

  return returnArray;
}
