import React from 'react';

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
