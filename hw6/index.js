//1.
var http = require('http');
var https = require('https');
var fs = require('fs');
var qs = require('querystring');
const path = require('path');
const url = require('url');

//2.
var server = http.createServer(function (req, resp) {

    let parsedUrl = url.parse(req.url, true);
    let queryData = parsedUrl.query;
    weatherurl = 'https://api.openweathermap.org/data/2.5/weather?q=';

    if (req.url === '/' || req.url.match('/index.js')) {


        if (req.url === '/index.js' || req.url === '/') {

            fs.readFile('./public/MyPage.html', 'UTF-8', function (err, data) {
                resp.writeHead(200, { 'Content-Type': 'text/html' });
                resp.end(data);
            });
        } else {
              
            weatherurl +=  queryData.q + '&units=' + queryData.units + '&appid=' + queryData.appid;
            https.get(weatherurl, function (response) {

                var body = '';

                response.on('data', function (chunk) {
                    body += chunk;
                });

                response.on('end', () => {

                    let result = JSON.parse(body);
                    if (result["cod"] == 404) {
                        resp.writeHead(404);

                    } else {
                        resp.writeHead(200, { 'Content-Type': 'application/json' });
                    }
                    resp.end(body);
                });
            });
        }
    }

    else if (req.url.match('\.png$')) {

        var image = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(image);
        resp.writeHead(200, { 'Content-Type': 'image/png' });
        fileStream.pipe(resp);
    }
    else {

        resp.writeHead(404, { 'Content-Type': 'text/html' });
        resp.end('No content found')
    }
  });

//5.
server.listen(5050);
 
console.log('Server Started listening on 5050');