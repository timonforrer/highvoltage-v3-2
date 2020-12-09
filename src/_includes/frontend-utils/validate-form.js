module.exports = (fields, honeyPotFieldName) => {
  const errors = {};

  for(let key in fields) {
    let value = fields[key];
    // check for empty fields
    if(key !== honeyPotFieldName && value === '') {
      // check if already declared
      errors.emptyFields = errors.emptyFields === undefined ? [] : errors.emptyFields;
      errors.emptyFields.push(key);
    }

    // check if email contains an @
    if(key === 'email' && !value.includes('@')) {
      // check if already declared
      errors.invalidFields = errors.invalidFields === undefined ? [] : errors.invalidFields;
      errors.invalidFields.push(
        {
          fieldName: 'email',
          message: {
            'de-ch': 'Ungültige E-Mail-Adresse',
            'en-gb': 'Invalid email address'
          }
        }
      )
    }

    // check if honeypot not empty
    if(key === honeyPotFieldName && value !== '') {
      // check if already declared
      errors.honeyPotTrapped = errors.honeyPotTrapped === undefined ? '' : errors.honeyPotTrapped;
      errors.honeyPotTrapped = true;
    }
  }
  return errors;
}
