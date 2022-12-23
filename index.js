var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// Serving styling for the html page.
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  // console.log('REQ', req.rawHeaders);
  // res.json({ greeting: 'hello API' });
  const rawHeaders = req.rawHeaders;
  // Host
  const hostKeyIndex = rawHeaders.indexOf('Host');
  const host = rawHeaders[hostKeyIndex + 1];
  const hostExtract = host.match(/^localhost|\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/);
  if (hostExtract) {
    if (hostExtract[0] === 'localhost') {
      ipaddress = '127.0.0.1';
    } else {
      ipaddress = hostExtract[0];
    }
  }
  // Language
  const languageKeyIndex = rawHeaders.indexOf('Accept-Language');
  const language = rawHeaders[languageKeyIndex + 1];
  // software
  const userAgentKeyIndex = rawHeaders.indexOf('User-Agent');
  const software = rawHeaders[userAgentKeyIndex + 1];
  res.json({ipaddress, language, software});


});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('App is listening on ' + listener.address().port);
});