const fetchData = require('./airtableDataController.js');
const base = require("./airtableShop.js");

module.exports = async (saleId, amountReceived) => {

  console.log('alrighto');
  
  // modify the sales record
  return base('Sales').update(saleId, {
    "Received": amountReceived,
    "Factured": true
  });

};
