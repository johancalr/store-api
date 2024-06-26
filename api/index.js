const express = require('express');
const cors = require('cors');
const { routerApi } = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
// Server initialization
const app = express();
const port = process.env.PORT??3000;

app.use(express.json());
const whiteList = [
  //'http://localhost:8080',
  'http://localhost:3000',
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
app.get('/api', (req, res) => {
  res.send('Hello Word with Express')
});

routerApi(app);
app.get('/*', (req, res) => {
  res.send('There is nothing here');
});
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Lauch server
app.listen(port, () => {
  console.log(`Running on port: ${port} successfully`);
});

module.exports = app;
