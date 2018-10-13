import * as React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet-async';
import CSSModules from '~/utils/cssModules';

import styles from './style.css';

export function loadData(): Promise<{}> {
  return new Promise(resolve => setTimeout(() => resolve('wait'), 1000));
}

function DemoPage(): JSX.Element {
  return (
    <section styleName="Demo">
      <Helmet>
        <title>demo page</title>
      </Helmet>
      demo
      <Link to={'/'} styleName="Link">
        to index
      </Link>
    </section>
  );
}

export default CSSModules(DemoPage, styles);
