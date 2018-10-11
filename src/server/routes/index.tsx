import express from 'express';
import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import Html from '../../components/common/Html';
import reactRoutes from '../../routes';

const router = express.Router();

router.get('*', (req, res) => {
  // tslint:disable-next-line prefer-const
  let context: StaticRouterContext = {};
  const url = req.baseUrl;

  const stream = renderToNodeStream(
    <Html>
      <StaticRouter location={url} context={context}>
        {renderRoutes(reactRoutes)}
      </StaticRouter>
    </Html>,
  );

  stream.pipe(res);
});

export default router;
