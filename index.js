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
  // IP
  const ipAddress = req.headers['true-client-ip'];
  // Language
  const language= req.headers['accept-language'];
  // software
  const software = req.headers['user-agent'];

  res.json({ipaddress: ipAddress, language, software});


});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('App is listening on ' + listener.address().port);
});