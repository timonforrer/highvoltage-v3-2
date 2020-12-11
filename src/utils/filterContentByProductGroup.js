module.exports = (prismicInput, airtableInput) => {
  return prismicInput.filter(item => (
      item.lang === airtableInput.lang && item.uid === airtableInput.prismicUID
    )
  )[0];
}
