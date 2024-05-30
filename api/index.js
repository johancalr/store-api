const express = require('express');
const cors = require('cors');
const { routerApi } = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');
const { config } = require('./config/config');
// Server initialization
const app = express();
const port = config.port;

app.use(express.json());
const whiteList = [
  `http://localhost:${config.port}`
  //'http://localhost:8080',
  //'http://myapp.co'
];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

// Routes creation
app.get('/', (req, res) => {
  res.send('Wellcome to my API');
});

// Use auth middleware
app.use(checkApiKey);

// Set routes
app.get('/api', (req, res) => {
  res.send('Hello Word with Express')
});
// Set core routes
routerApi(app);
// Set alternative routes
app.get('/*', (req, res) => {
  res.send('There is nothing here');
});
// Other middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Lauch server
app.listen(port, () => {
  console.log(`Running on port: ${port} successfully`);
});

module.exports = app;
