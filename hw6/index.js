//1.
var http = require('http');
var https = require('https');
var fs = require('fs');
var qs = require('querystring');
var post;
var weatherurl = 'https://api.openweathermap.org/data/2.5/weather'

//2.
var server = http.createServer(function (req, resp) {
    //3.
    if (req.url === "/"  || req.url === "/index.js") {
        fs.readFile("public/MyPage.html", function (error, pgResp) {
            if (error) {
                resp.writeHead(404);
                resp.write('Contents you are looking are Not Found');
            } else {
                resp.writeHead(200, { 'Content-Type': 'text/html' });
                resp.write(pgResp);
                if(req.method === 'POST'){
                  let body = '';
                  req.on('data', chunk => {
                      body += chunk;
                  });
                  req.on('end', () => {
                    post=qs.parse(body);
                    weatherurl += '?q='+post.q+'&units='+post.units+'&appid='+post.appid;

                    https.get(weatherurl, (response) => {
                      let rawData = ''
                    
                      response.on('data', (chunk) => { 
                        rawData += chunk 
                      })
                      response.on('end', () => {
                        try {
                          const parsedData = JSON.parse(rawData);
                        } catch (e) {
                          console.error(e.message)
                        }
                      })
                      
                    }).on('error', (error) => {
                      console.error(`Got error: ${error.message}`)
                  })
                  });
                }
            }  
            resp.end();
        });
    } else {
        //4.
        resp.writeHead(200, { 'Content-Type': 'text/html' });
        resp.write('<h2>To go to search page enter :</h2> ' + req.url);
        resp.end();
    }
});

//5.
server.listen(5050);
 
console.log('Server Started listening on 5050');

