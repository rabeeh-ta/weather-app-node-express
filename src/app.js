const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { geoCode } = require('./utils/geocode');
const { foreCast } = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// defineing paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setting up directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'rabeeh',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Rabeeh ta',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    helpText:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque consectetur velit, voluptate libero fugit dignissimos totam, omnis eveniet inventore est corporis dolorem repellendus cum eum quis repudiandae doloribus! Tenetur, vitae.',
    title: 'Help',
    name: 'Rabeeh',
  });
});

app.get('/weather', (req, res) => {
  // make sure address is passed
  if (!req.query.address) {
    return res.send({
      error: 'you must provide a address',
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        console.log(error);
        return res.send({ error });
      }

      foreCast(latitude, longitude, (error, resForeCast) => {
        if (error) {
          console.log(error);
          return res.send({ error });
        }

        res.send({
          location: location,
          forecast: resForeCast,
          address: req.query.address,
        });
      });
    }
  );

  // send the response
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'that was the last thing in help',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    message: 'The Page you are looking for does not exist',
    title: 404,
  });
});

app.listen(port, () => {
  console.log('server is up on port ' + port);
});
