import * as React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from '~/components/common/Helmet';
import CSSModules from '~/utils/cssModules';
import styles from './style.css';

export function loadData(): Promise<{}> {
  return new Promise(resolve => setTimeout(() => resolve('wait'), 1000));
}

const title = 'demo page';
const description = 'demo page description';

function DemoPage(): JSX.Element {
  return (
    <section styleName="Demo">
      <Helmet {...{ title, description }} />
      demo
      <Link to={'/'} styleName="Link">
        to index
      </Link>
    </section>
  );
}

export default CSSModules(DemoPage, styles);
