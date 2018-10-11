import express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { HelmetProvider, FilledContext } from 'react-helmet-async';

import reactRoutes from '../../routes';

const router = express.Router();

router.get('*', (req, res) => {
  // tslint:disable-next-line prefer-const
  let context: StaticRouterContext = {};
  const url = req.baseUrl;

  const helmetContext = {};
  const app = (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} context={context}>
        {renderRoutes(reactRoutes)}
      </StaticRouter>
    </HelmetProvider>
  );

  const markup = renderToString(app);

  res.render('index', { markup, title: (helmetContext as FilledContext).helmet.title });
});

export default router;
