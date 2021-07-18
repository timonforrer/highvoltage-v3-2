// const fetchData = require('./airtableDataController.js');
const base = require("./airtableShop.js");

module.exports = async (saleId, amountReceived) => {

  console.log('alrighto');
  
  // modify the sales record
  return base('Verkäufe').update(saleId, {
    "Geld Erhalten": amountReceived,
    "_stripe_payment_success": true
  });

};
