const fs = require('fs');

// The JS file
const js = fs.readFileSync(`${__dirname}/../client/client.js`);

// Writes the javascript into the response
const getJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(js);
  response.end();
};

module.exports = {
  getJS,
};
