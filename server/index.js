/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const mongodb = require('mongodb');
const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
  ? require('ngrok')
  : false;
const resolve = require('path').resolve;
const app = express();
const api = require('./api/index');

// If you need a backend, e.g. an API, add your custom backend-specific
// middleware here app.use('/api', myApi);

let db;

const dbUrl = 'mongodb://localhost:27017/bookClub';

mongodb
  .MongoClient
  .connect(dbUrl, (err, connection) => {
    if (err) {
      console.log('connection err');
    } else {
      console.log('connected');
      db = connection;
    }
  });

const exposeDb = function (req, res, next) {
  req.db = db;
  next();
};

app.use('/api', exposeDb, api);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
});

// get the intended host and port number, use localhost and port 3000 if not
// provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
