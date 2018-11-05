import * as React from 'react';

import { Helmet } from '../common/Helmet';

export default function IndexPage(): JSX.Element {
  const title = 'root page';
  const description = 'root page description';

  return (
    <section className="Index">
      <Helmet {...{ title, description }} />
      index
    </section>
  );
}
