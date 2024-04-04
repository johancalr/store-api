const express = require('express');
const { routerApi } = require('./routes');

// Server initialization
const app = express();
const port = 3000;

app.use(express.json());

// Routes creation
app.get('/', (req, res) => {
  res.send('Hello Word with Express')
});

routerApi(app);

// Lauch server
app.listen(port, () => {
  console.log(`Running on port: ${port} successfully`);
});
