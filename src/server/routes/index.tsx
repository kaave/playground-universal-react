import express from 'express';
import * as React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes as getMatchRoutes, renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { Provider as ReactReduxProvider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';

import reactRoutes, { RouteConfigWithLoadData } from '../../routes';
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
    .map(dispatch => dispatch!);

  try {
    const store = getStore({ initialState: {}, history: createHistory(), isServer: true });
    const App = (
      <ReactReduxProvider store={store}>
        <StaticRouter location={url} context={{}}>
          {renderRoutes(reactRoutes)}
        </StaticRouter>
      </ReactReduxProvider>
    );

    store.runSaga(rootSaga).done.then(() => {
      const markup = renderToString(App);
      const preloadedState = JSON.stringify(store.getState());
      const helmet = Helmet.renderStatic();

      res.render('index', {
        markup,
        title: helmet.title.toString(),
        meta: helmet.meta.toString(),
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
