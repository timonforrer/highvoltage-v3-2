const base = require('./airtableShop.js');

module.exports = (address) => {
  const {
    firstName,
    lastName,
    email,
    street,
    zip,
    city,
    country
  } = address;

  return new Promise((resolve, reject) => {
    base('Customers').create(
      {
        "First Name": firstName,
        "Last Name": lastName,
        "Email Address": email,
        "Street": street,
        "ZIP Code": Number(zip),
        "City": city,
        "Country": country
      }, (err, record) => {
      if(err) reject(err);
      resolve(record.getId());
    });
  });
};
