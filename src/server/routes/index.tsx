import express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes as getMatchRoutes, renderRoutes } from 'react-router-config';
import { HelmetProvider, FilledContext } from 'react-helmet-async';

import reactRoutes, { RouteConfigWithLoadData } from '../../routes';

const router = express.Router();

router.get('*', async (req, res) => {
  // tslint:disable-next-line prefer-const
  let context: StaticRouterContext = {};
  const url = req.baseUrl;

  const matchRoutes = getMatchRoutes(reactRoutes, url);
  if (!matchRoutes.find(({ match }) => match.isExact)) {
    res.render('404');
    return;
  }

  const loadDatas = matchRoutes
    .map(({ route }) => (route as RouteConfigWithLoadData).loadData)
    .filter(loadData => loadData != null)
    .map(loadData => loadData!());

  try {
    await Promise.all(loadDatas);

    const helmetContext = {};
    const markup = renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url} context={context}>
          {renderRoutes(reactRoutes)}
        </StaticRouter>
      </HelmetProvider>,
    );

    res.render('index', { markup, title: (helmetContext as FilledContext).helmet.title });
  } catch (error) {
    res.render('500');
    console.error(error);
  }
});

export default router;
