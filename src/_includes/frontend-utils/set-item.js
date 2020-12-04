const event = new Event('itemInserted')

module.exports = (key,value) => {
  localStorage.setItem(key,value);
  document.dispatchEvent(event);
};
