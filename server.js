const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const js2xmlparser = require("js2xmlparser");
const app = express();
const port = 3000;
 
let weatherData = [];
 
// Lees de CSV data

fs.createReadStream('weatherdata.csv')

  .pipe(csv())

  .on('data', (row) => {

    weatherData.push(row);

  })

  .on('end', () => {

    console.log('CSV file successfully processed');

  });
 
// JSON endpoint

app.get('/api/weather', (req, res) => {

  res.json(weatherData);

});
 
// XML endpoint

app.get('/api/weather/xml', (req, res) => {

  res.set('Content-Type', 'text/xml');

  res.send(js2xmlparser.parse("weather", weatherData));

});
 
// Start de server

app.listen(port, () => {

  console.log(`Server running at http://localhost:${port}/`);

});
