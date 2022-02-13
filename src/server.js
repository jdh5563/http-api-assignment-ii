const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const cssHandler = require('./cssResponses.js');
const jsHandler = require('./jsResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// https://github.com/IGM-RichMedia-at-RIT/body-parse-example-done/blob/master/src/server.js
// Parses the body of a response chunk by chunk then sends it to the given handler
const parseBody = (request, response, handler) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    handler(request, response, bodyParams);
  });
};

// Calls different functions depending on what was requested
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': cssHandler.getStyle,
  '/client.js': jsHandler.getJS,
  '/getUsers': jsonHandler.getUsers,
  '/addUser': parseBody,
  '/notReal': jsonHandler.notFound,
  notFound: jsonHandler.notFound,
};

// Handles requests from the server
const onRequest = (request, response) => {
  // Parse the url from the request
  const parsedURL = url.parse(request.url);

  const func = urlStruct[parsedURL.pathname] || urlStruct.notFound;
  func(request, response, jsonHandler.addUser);
};

// Create the server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
