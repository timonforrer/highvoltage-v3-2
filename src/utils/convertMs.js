module.exports = (value) => {
  var ms = value % 1000;
    value = (value - ms) / 1000;
    var secs = value % 60;
    value = (value - secs) / 60;
    var mins = value % 60;

    return `${mins}.${secs}`;
}
