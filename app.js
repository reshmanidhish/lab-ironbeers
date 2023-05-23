const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    beerImage: 'public/images/beer.png',
    key: 'something'
  });
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beer: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', function (req, res) {
  punkAPI
    .getRandom()
    .then(function (responseFromAPI) {
      const randomBeer = responseFromAPI[0];

      res.render('random-beer', randomBeer );
    })

    .catch(function (error) {
      console.log(error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
