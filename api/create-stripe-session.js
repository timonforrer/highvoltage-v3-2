const stripe = require('stripe')('sk_test_51HqjRwDeD8oJRtClnY2hI3JMX1Y2TTWh68smI5IKEr8bLTsv7SwmAFb77S2dvK8aJW9nV7SiYTcZh0o85xRGX88z00HttRq6Mz');
const base = require('../src/utils/airtableShop.js');
const createCustomer = require('../src/utils/createCustomer.js');
const createSale = require('../src/utils/createSale.js');
const fetchData = require('../src/utils/airtableDataController.js');

// utility to get index of item in array
function findIndex(array, sku) {
  return array.findIndex(function(item) {
    return item.sku === sku;
  });
};

const T = {
  shippingCosts: {
    'de-ch': 'Porto-Kosten',
    'en-gb': 'Shipping costs'
  }
}

module.exports = async (req, res) => {

  // get content from request
  const { body } = req;
  let {
    address,
    cart,
    lang
  } = JSON.parse(body);

  // get all products from airtable base
  let airtableProducts = await fetchData(base('Products'), 'Default', '');
  let shippingCosts = await fetchData(base('Freight Cost'), 'Default', '');

  // remap airtable products
  airtableProducts = airtableProducts.map(product => {
    let fields = product.fields;
    return {
      sku: fields['Product Number'],
      basePrice: fields['Base Price'],
      maxQuantity: fields['Inventory'],
      recordId: product.id
    };
  });

  // very ugly..
  shippingCosts = shippingCosts.filter(item => {
    return item.fields['Country Code'] === address.country;
  });

  // overwrite prices with data from airtable and add additional info
  cart = cart.map(item => {
    const index = findIndex(airtableProducts, item.sku);
    const atProduct = airtableProducts[index];
    return {
      ...item,
      basePrice: atProduct.basePrice,
      recordId: atProduct.recordId
    };
  });

  // function to check for each item, if any ordered more then currently in stock
  const tooMany = (itemsToCheck, baseArray) => {
    return itemsToCheck.some(item => {
      const index = findIndex(baseArray, item.sku);
      return item.quantity > baseArray[index].maxQuantity;
    });
  };

  // if too many items ordered, send error
  if(tooMany(cart, airtableProducts)) {

    const response = {
      'de-ch': 'Zu viele Stücke bestellt. Minimiere die Anzahl Stücke',
      'en-gb': 'Too many items ordered. Minimize the amount of items.'
    };

    res.json({ error: response }).status(400);

  } else {

    // all good
    // construct lineItems to send to stripe
    const lineItems = cart.map(item => {
      const value = item.basePrice * 100;
      return {
        price_data: {
          currency: 'chf',
          product_data: {
            name: item.name,
            metadata: {
              SKU: item.sku
            }
          },
          unit_amount: value
        },
        quantity: item.quantity
      }
    });

    const shippingCostsLineItems = {
      price_data: {
        currency: 'chf',
        product_data: {
          name: T.shippingCosts[lang],
        },
        unit_amount: shippingCosts[0].fields['Freight Cost'] * 100
      },
      quantity: 1
    }

    // create a session ID
    const session = await stripe.checkout.sessions.create({
      customer_email: address.email,
      payment_method_types: ['card'],
      line_items: [
        ...lineItems,
        shippingCostsLineItems
      ],
      mode: 'payment',
      success_url: 'https://www.voltagearc.com/success/',
      cancel_url: 'https://www.voltagearc.com/cancelled/'
    }).catch(err => console.error(err));

    // create a customer
    // const customer = await createCustomer(address).catch(err => console.error(err));
    // await createSale(customer, session.id, cart).catch(err => console.error(err));
    res.json({ id: session.id });
  };
};