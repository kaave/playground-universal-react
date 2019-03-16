import express from 'express';
import * as React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { matchRoutes as getMatchRoutes, renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';

import { Meta } from '~/value-objects/Meta';
import reactRoutes, { RouteConfigWithLoadData, RunDispatch } from '../../routes';
import { getStore } from '../../reduxes/store';
import { rootSaga } from '../../reduxes/sagas';

const router = express.Router();

router.get('*', async (req, res) => {
  // tslint:disable-next-line prefer-const
  const url = req.baseUrl;

  const matchRoutes = getMatchRoutes(reactRoutes, url);
  const exactRoute = matchRoutes.find(({ match }) => match.isExact);
  if (!exactRoute) {
    res.render('404');
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
        const markup = renderToString(App);
        const preloadedState = JSON.stringify(store.getState());

        res.render('index', {
          markup,
          title: meta.title || '',
          // meta: helmet.meta.toString(),
          meta: '',
          preloadedState,
          isProduction: process.env.NODE_ENV === 'production',
        });
      });

    renderToStaticMarkup(App); // start redux-saga
    dispatches.forEach(func => func(store.dispatch, exactRoute.match.params));
    store.close(); // stop redux-saga
  } catch (error) {
    res.render('500');
    console.error(error);
  }
});

export default router;
