const base = require('./airtableShop.js');

module.exports = async (customerId, stripeSessionID, products) => {

  // create new promise for new sale entry
  let createSale = new Promise((resolve, reject) => {
    base('Sales').create(
      {
        "Customer Number": [customerId],
        "Vendor": "Online Shop",
        "Factured": false,
        "stripeSessionID": stripeSessionID
      }, (err, record) => {
      if (err) reject(err);
      resolve(record.getId());
    });
  });

  let saleId = await createSale;

  return new Promise((resolve, reject) => {
    const productsFormatted = products.map(product => {
      return {
        "fields": {
          "Products": [product.recordId],
          "Quantity": Number(product.quantity),
          "Sales": [saleId]
        }
      };
    });

    base('Products in Sales').create(productsFormatted, (err) => {
      if (err) reject(err);
      resolve('all good');
    });
  });
};
