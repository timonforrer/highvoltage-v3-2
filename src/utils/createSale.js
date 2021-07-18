const base = require('./airtableShop.js');

module.exports = async (address, paymentIntent, products, shippingCosts) => {

  const {
    firstName,
    lastName,
    email,
    street,
    zip,
    city,
    country
  } = address;

  // create new promise for new sale entry
  let createSale = new Promise((resolve, reject) => {
    base('Verkäufe').create(
      {
        // "Customer Number": [customerId],
        "Datum": (new Date()).toISOString().split('T')[0],
        "E-Mail": email,
        "Vorname, Name": `${firstName} ${lastName}`,
        "Strasse": street,
        "PLZ": Number(zip),
        "Ort": city,
        // "Kanton": 'TODO',
        "Land": country,
        "Porto": shippingCosts,
        "Verkäufer": "Online Shop",
        "_stripe_payment_success": false,
        "_stripe_payment_intent": paymentIntent
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
          "Artikel": [product.recordId],
          "Preis pro Artikel": product.basePrice,
          "Anzahl": Number(product.quantity),
          "Gehört zu Verkauf": [saleId]
        }
      };
    });

    base('Artikel in Verkäufen').create(productsFormatted, (err) => {
      if (err) reject(err);
      resolve('all good');
    });
  });
};
