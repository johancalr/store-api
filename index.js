const express = require('express');
const { routerApi } = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
// Server initialization
const app = express();
const port = 3000;

app.use(express.json());

// Routes creation
app.get('/', (req, res) => {
  res.send('Hello Word with Express')
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Lauch server
app.listen(port, () => {
  console.log(`Running on port: ${port} successfully`);
});
