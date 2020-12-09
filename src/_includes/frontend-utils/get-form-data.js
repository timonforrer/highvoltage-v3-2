module.exports = (form, fields) => {
  let data = {};
  const formData = new FormData(form);
  fields.forEach(fieldKey => {
    const value = formData.get(fieldKey);
    data[fieldKey] = value.trim();
  });
  return data;
}