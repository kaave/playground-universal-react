import * as React from 'react';
import { Link } from 'react-router-dom';

export default function IndexPage(): JSX.Element {
  return (
    <section className="Index">
      index
      <Link to={'/demo'}>to demo</Link>
    </section>
  );
}
