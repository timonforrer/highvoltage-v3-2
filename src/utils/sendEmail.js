const emailText = require('./emailText.js');
const md = require('markdown-it')();
const stripHtml = require('string-strip-html');
const sg = require('@sendgrid/mail');

module.exports = (email, itemsOrdered, amountReceived) => {

  sg.setApiKey(process.env.VA_SENDGRID_API_KEY);

  const markDown = emailText(itemsOrdered, amountReceived);
  const html = md.render(markDown);
  const rawText = stripHtml(html).result;

  const msg = {
    to: email,
    from: 'info@voltagearc.com',
    subject: 'Order confirmation – Voltage Arc Online Shop',
    text: rawText,
    html: html
  };

  return sg
    .send(msg)
    .then(() => console.log('Email sent'))
    .catch((err) => console.error(err));
};
