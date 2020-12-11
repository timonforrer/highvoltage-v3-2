module.exports = (value) => {
  return new Date(value).toISOString().split('T')[0];
}
