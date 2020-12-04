const stripe = require('stripe')('sk_test_51HqjRwDeD8oJRtClnY2hI3JMX1Y2TTWh68smI5IKEr8bLTsv7SwmAFb77S2dvK8aJW9nV7SiYTcZh0o85xRGX88z00HttRq6Mz');

module.exports = async (req, res) => {

  const { body } = req;
  console.log(body);
  res.send('hello').status(200);
  
  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: 'chf',
  //         product_data: {
  //           name: 'Test',
  //           metadata: {
  //             SKU: 'VA-P-4'
  //           }
  //         },
  //         unit_amount: 2000,
  //       },
  //       quantity: 1
  //     }
  //   ],
  //   mode: 'payment',
  //   success_url: 'https://www.voltagearc.com/success/',
  //   cancel_url: 'https://www.voltagearc.com/cancelled/',
  //   shipping_address_collection: {
  //     allowed_countries: ['CH', 'DE', 'AU']
  //   }
  // });
  // res.json({ id: session.id });
};