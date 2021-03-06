const fs = require('fs');

module.exports = (data, path) => {
  data = JSON.stringify(data);
  if(process.env.ELEVENTY_ENV == 'seed') {
    fs.writeFile(path, data, err => {
      if(err) {
        console.log(err);
      } else {
        console.log(`Data saved for dev: ${path}`);
      }
    });
  }
};
