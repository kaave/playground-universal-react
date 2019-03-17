import * as React from 'react';

export interface Props {
  lang: string;
  code: number;
  isProduction?: boolean;
}

export const Error: React.FC<Props> = ({ lang, code, isProduction }) => (
  <html lang={lang}>
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>{code}</title>
      <link rel="stylesheet" href="/global.css" />
      {isProduction && <link rel="stylesheet" href="/index.css" />}
    </head>
    <body>
      <main id="main" className="Main" role="main">
        {code}
      </main>
    </body>
  </html>
);
