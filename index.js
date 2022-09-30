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

app.get('/api/:date?', (req, res) => {
  
  let unixDate = Date.parse(req.params.date)
  console.log(req.params.date, Date.parse(req.params.date))
  if (isNaN(unixDate)) {
    if (!req.params.date) {
      now = new Date();
      return res.send({ unix: now.getTime(), utc: now.toUTCString() })
    } else if ((/([a-z]|-)+/).test(req.params.date)) {
      return res.send({ error: 'Invalid Date'})
    } else {
      let dateObj = new Date(parseInt(req.params.date));
      return res.send({ unix: parseInt(req.params.date), utc: dateObj.toUTCString() })
    }  
  } else {
    return res.send({ unix: unixDate, utc: new Date(unixDate).toUTCString() })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
