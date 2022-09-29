// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', (req, res) => {

  if (/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(req.params.date)) {
    let dateObj = new Date(req.params.date);
    let utcDate = dateObj.toUTCString();
    let unixDate = dateObj.getTime();
    res.send({unix: unixDate, 'utc': utcDate});
  } else if (/[0-9]+/.test(req.params.date)){
    let unixDate = parseInt(req.params.date);
    let utc = new Date(unixDate);
    let utcDate = utc.toUTCString();
    res.send({unix: unixDate, 'utc': utcDate});
  } else if (req.params.date === "") {
    let dateObj = Date.now();
    utcDate = dateObj.toUTCString();
    unixDate = dateObj.getTime();
    res.send({unix: unixDate, 'utc': utcDate});
  } else {
    res.send({ error : "Invalid Date" })
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
