import 'dotenv/config';
import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
import routes from './routes';
import './database/index'; // Get index file
import sentryConfig from './config/sentry';

class App {
  constructor() {
    // Constructor method will always be the first method to be instantiated, so it will call our services, routes and midlewares.
    this.server = express();
    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json()); // in the midleware route to handle our req and res better and with the next // json format only
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  } // Recurso do express Static , servir arquivos estaticos como de imagens, css , html

  routes() {
    this.server.use(routes); // will import my routes from the routes file
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal sever error' });
    });
  }
}
export default new App().server; // instantiate a builder method but the only thing instantiating will be the server
