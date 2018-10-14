import * as React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from '../common/Helmet';

export default function IndexPage(): JSX.Element {
  const title = 'root page';
  const description = 'root page description';

  return (
    <section className="Index">
      <Helmet {...{ title, description }} />
      index
      <Link to="/demo">to demo</Link>
    </section>
  );
}
