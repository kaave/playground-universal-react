import * as React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet-async';

export default function DemoPage(): JSX.Element {
  return (
    <section className="Demo">
      <Helmet>
        <title>demo page</title>
      </Helmet>
      demo
      <Link to={'/'}>to index</Link>
    </section>
  );
}
