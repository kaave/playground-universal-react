import * as React from 'react';
import { Link } from 'react-router-dom';

export default function DemoPage(): JSX.Element {
  return (
    <section className="Demo">
      demo
      <Link to={'/'}>to index</Link>
    </section>
  );
}
