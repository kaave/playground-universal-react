import * as React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet-async';

import styles from './style.css';

export function loadData(): Promise<{}> {
  return new Promise(resolve => setTimeout(() => resolve('wait'), 1000));
}

export default function DemoPage(): JSX.Element {
  return (
    <section className={styles.Demo}>
      <Helmet>
        <title>demo page</title>
      </Helmet>
      demo
      <Link to={'/'} className={styles.Link}>
        to index
      </Link>
    </section>
  );
}
