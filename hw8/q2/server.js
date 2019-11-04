const express = require('express');
const app = express();
const request = require('request');
const router = express.Router();
const path = require('path');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');


const url = 'mongodb+srv://abhibharadwaj58:12344321@mycluster1-ievyb.mongodb.net/test?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(express.static('public'));

mongodb.MongoClient.connect(url, (error, client) => {

   if (error) {

      return process.exit(1);
   }
   let db = client.db('searchTable');

   app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
   });

   app.get('/searchTerms', (req, res) => {
      db.collection('search')
         .find({ "searchTerms": { $regex: new RegExp(".*" + req.query['q'] + ".*", "i") } }, { sort: { _id: -1 } })
         .toArray((error, searchTerms) => {
            if (error) {
               return next(error);
            }
            res.send(searchTerms);
         })
   });

   app.post('/searchTerms', (req, res) => {
      let newSearch = req.body;
      db.collection('search').insert(newSearch, (error, results) => {
         if (error) {
            return next(error);
         }
         res.send(results);
      })
   });

   app.use('/', router);
   app.listen(process.env.port || 3000);

   console.log('Running at Port 3000');
});

