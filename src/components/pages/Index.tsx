import * as React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet-async';

export default function IndexPage(): JSX.Element {
  return (
    <section className="Index">
      <Helmet>
        <title>root page</title>
      </Helmet>
      index
      <Link to={'/demo'}>to demo</Link>
    </section>
  );
}
