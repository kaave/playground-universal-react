import * as React from 'react';

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
    <>
      <Helmet {...{ title, description }} />
      <section styleName="Demo" className="Demo">
        demo
      </section>
    </>
  );
}

export default CSSModules(DemoPage, styles) as () => JSX.Element;
