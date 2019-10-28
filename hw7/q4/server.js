const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const router = express.Router();

app.use(express.static('public'))

router.get('/', function (req, res) {
  res.send('sucess');
});

router.get('/server.js', function (req, res) {
  let query = req.query['q']
  query = query.toUpperCase();
  if (query.startsWith("TEMP:")) {
    query = query.replace("TEMP:", "");
    let apiKey = '&appid=a9542ba3ab845690a73767396645cdb4';
    let cityname = query
    var apiurl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + cityname + apiKey

    request(apiurl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
   
        res.send(body)    
      }
      else {
        res.send(error)
      }
    })    
  }
 
  else {
    let url = 'https://www.google.com/search?q=' + query
    res.redirect(url)
  }

});

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');