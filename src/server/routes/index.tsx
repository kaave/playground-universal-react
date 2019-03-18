import express, { Express, Response } from 'express';
import * as React from 'react';
import { renderToString, renderToStaticMarkup, renderToNodeStream } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { matchRoutes as getMatchRoutes, renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';

import { Html, Props as HtmlProps } from '../views';
import { Error } from '../views/Error';
import { Meta } from '~/value-objects/meta';
import reactRoutes, { RouteConfigWithLoadData, RunDispatch } from '../../routes';
import { getStore } from '../../reduxes/store';
import { rootSaga } from '../../reduxes/sagas';

const router = express.Router();
const lang = 'ja';
const isProduction = process.env.NODE_ENV === 'production';

const getResponseWithDoctypeHtml: (res: Response) => (markup: string) => Response = res => markup =>
  res.send(`<!doctype html>${markup}`);

router.get('*', async (req, res) => {
  const url = req.baseUrl;
  const responseWithDoctypeHtml = getResponseWithDoctypeHtml(res);

  const matchRoutes = getMatchRoutes(reactRoutes, url);
  const exactRoute = matchRoutes.find(({ match }) => match.isExact);
  if (!exactRoute) {
    responseWithDoctypeHtml(renderToStaticMarkup(<Error {...{ lang, code: 404, isProduction }} />));
    return;
  }

  const dispatches = matchRoutes
    .map(({ route }) => (route as RouteConfigWithLoadData).runDispatch)
    .filter(dispatch => dispatch != null)
    .map(dispatch => dispatch as RunDispatch);
  const meta = matchRoutes
    .map(({ route }) => (route as RouteConfigWithLoadData).meta)
    .filter(m => m != null)
    .map(m => m as Meta)
    .reduce<Meta>((tmp, m) => ({ ...tmp, ...m }), {});

  try {
    const store = getStore({ initialState: {}, history: createHistory(), isServer: true });
    const App = (
      <Provider store={store}>
        <Router location={url} context={{}}>
          {renderRoutes(reactRoutes)}
        </Router>
      </Provider>
    );

    store
      .runSaga(rootSaga)
      .toPromise()
      .then(() => {
        const props: HtmlProps = { meta, lang, isProduction, preloadedState: store.getState() };
        responseWithDoctypeHtml(renderToStaticMarkup(<Html {...props}>{renderToString(App)}</Html>));
      });

    renderToStaticMarkup(App); // start redux-saga
    dispatches.forEach(func => func(store.dispatch, exactRoute.match.params));
    store.close(); // stop redux-saga
  } catch (error) {
    responseWithDoctypeHtml(renderToStaticMarkup(<Error {...{ lang, code: 500, isProduction }} />));
    console.error(error);
  }
});

export function registRoutes(app: Express) {
  app.use('*', router);
}

export default router;
