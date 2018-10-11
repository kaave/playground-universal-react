import React from 'react';

export default function Body({ children }: React.Props<{}>): JSX.Element {
  return (
    <body>
      <div id="mount-point">{children}</div>
      <script src="/vendor.bundle.js" />
      <script src="/index.js" />
    </body>
  );
}
