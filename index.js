require('./utils/auth');
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

// Enable Express
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Enable CORS wth config options
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

// Some end-points
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/new-path',
  checkApiKey,
  (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// Init Router
routerApi(app);

// Init middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Mi server running at ${port}`);
});
