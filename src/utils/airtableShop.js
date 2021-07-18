const Airtable = require('airtable');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
});

// for development, always connect to the test database
const baseID = process.env.NODE_ENV === 'development'
  ? process.env.AIRTABLE_API_BASE_SHOP_V2_TESTENV
  : process.env.AIRTABLE_API_BASE_SHOP_V2;

const base = Airtable.base(baseID);

module.exports = base;
