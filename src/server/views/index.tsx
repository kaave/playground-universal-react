import * as React from 'react';

import { Meta as MetaType } from '~/value-objects/meta';
import { Meta } from './Meta';

const serviceWorkerRegisterScript = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'));
}`;

export interface Props {
  lang: string;
  meta?: MetaType;
  isProduction?: boolean;
  preloadedState?: unknown;
}

export const Html: React.FC<Props> = ({ lang, meta, isProduction, preloadedState, children }) => (
  <html lang={lang}>
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      {meta && <Meta meta={meta} />}
      <link rel="stylesheet" href="/global.css" />
      {isProduction && <link rel="stylesheet" href="/index.css" />}
    </head>
    <body>
      <div
        id="mount-point"
        data-state={JSON.stringify(preloadedState || {})}
        dangerouslySetInnerHTML={{ __html: children as string }}
      />
      <script src="https://cdn.polyfill.io/v2/polyfill.js?features=default-3.3,Promise" />
      {isProduction && <script dangerouslySetInnerHTML={{ __html: serviceWorkerRegisterScript }} />}
      <script src="/vendor.bundle.js" defer />
      <script src="/index.js" defer />
    </body>
  </html>
);
