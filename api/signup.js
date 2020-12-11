let response = ''
module.exports = (req, res) => {
  const {
    lang,
    firstName,
    lastName,
    email
  } = req.query

  // todo: check if honeypot field has default value of 'undefined'
  if (lastName !== undefined) {
    // todo: check if this is the right way to send a status
    res.status(200).send('success');

  } else if (firstName === '' | email === '') {
    // no first name or e-mail provided

    response = {
      en: 'Please indicate your first name and your e-mail address.',
      de: 'Bitte geben Sie Ihren Vornamen und ihre E-Mail-Adresse an.'
    }
    res.status(400).send(response[lang]);

  } else if ('todo') {
    // todo: check if e-mail is valid

    response = {
      en: 'Format of e-mail address is not valid. Please provide a valid e-mail address.',
      de: 'Format der E-Mail-Adresse ist ungültig. Bitte geben Sie eine gültige E-Mail-Adresse an.'
    }
    res.status(400).send(response[lang]);
  } else {
    // fields are valid, send to mailchimp and await result

  }
}