import React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

import Head from './Head';
import Body from './Body';

export default function Html({ children }: React.Props<{}>): JSX.Element {
  return (
    <html>
      <Head />
      <Body>{children}</Body>
    </html>
  );
}
