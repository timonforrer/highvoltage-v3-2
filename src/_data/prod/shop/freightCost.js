const base = require('../../../utils/airtableShop.js');
const fetchData = require('../../../utils/airtableDataController.js');
const saveSeed = require('../../../utils/saveSeed.js');

module.exports = async () => {
  const response = await fetchData(base('Freight Cost'), 'Default', '');

  const constructBaseFields = (data) => {
    return {
      country: {
        code: data['Country Code'],
        name: {
          'de-ch': data['Name de-ch'],
          'en-gb': data['Name en-gb']
        }
      },
      freightCost: data['Freight Cost']
    };
  };

  const responseFormatted = response.map(item => {
    return constructBaseFields(item.fields);
  });

  saveSeed(responseFormatted, `${__dirname}/../../dev/shop/freightCost.json`);

  return responseFormatted;
}
