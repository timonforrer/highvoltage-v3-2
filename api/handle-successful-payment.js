const base = require('../src/utils/airtableShop.js');
const sendEmail = require('../src/utils/sendEmail.js');
const updateSale = require('../src/utils/updateSale.js');
const fetchData = require('../src/utils/airtableDataController.js');

module.exports = async (req, res) => {

  // get data from body
  let event
  const { body } = req;

  // handle errors
  try {
    event = body;
  } catch(err) {
    res.status(400).send(`Webhook error ${err.message}`);
  }

  // handle different types of events
  switch (event.type) {
    case 'charge.succeeded':
      
      // someone got actually charged
      const paymentIntent = event.data.object;
      
      // get the email of the customer
      const { email } = paymentIntent.billing_details;
      
      // get the sale to modify
      let sale = (await fetchData(
        base('Verkäufe'),
        'Grid view',
        `{_stripe_payment_intent}="${paymentIntent.payment_intent}"`
      ))[0];
      sale = {
        id: sale.id,
        items: sale.fields['Artikelinfos']
      };

      let amountReceived = (paymentIntent.amount / 100);

      // update the record in the database
      await updateSale(sale.id, amountReceived);
      // send a confirmation email to the customer
      await sendEmail(email, sale.items, amountReceived);

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}