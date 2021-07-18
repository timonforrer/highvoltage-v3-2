const stripe = process.env.NODE_ENV === 'development'
  ? require('stripe')(process.env.STRIPE_API_TEST_SECRET)
  : require('stripe')(process.env.STRIPE_API_LIVE_SECRET);
const base = require('../src/utils/airtableShop.js');
// const createCustomer = require('../src/utils/createCustomer.js');
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
  let airtableProducts = await fetchData(base('Artikel'), 'Online', '');
  let shippingCosts = await fetchData(base('Portokosten'), 'Default', '');

  // remap airtable products
  airtableProducts = airtableProducts.map(product => {
    let fields = product.fields;
    return {
      sku: fields['Artikelnummer'],
      basePrice: fields['Verkaufspreis Onlineshop'],
      maxQuantity: fields['Lager ist'],
      recordId: product.id
    };
  });

  // very ugly..
  shippingCosts = shippingCosts.filter(item => {
    return item.fields['Ländercode'] === address.country;
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
        unit_amount: shippingCosts[0].fields['Portokosten'] * 100
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
    // TODO: add shipping address in line with order
    // const customer = await createCustomer(address).catch(err => console.error(err));
    await createSale(address, session.payment_intent, cart, shippingCosts[0].fields['Portokosten']).catch(err => console.error(err));
    // await createSale(customer, session.payment_intent, cart).catch(err => console.error(err));
    res.json({ id: session.id });
  };
};