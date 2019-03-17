import * as React from 'react';

import CSSModules from '~/utils/cssModules';
import styles from './style.css';
import * as Meta from '~/value-objects/meta';
import { updateMeta } from '~/services/metaService';

export const meta: Meta.Meta = Meta.create({
  title: 'demo page',
  description: 'demo page description',
});

const DemoPage: React.FC<{}> = () => {
  React.useEffect(() => updateMeta(meta), []);

  return (
    <section styleName="Demo" className="Demo">
      demo
    </section>
  );
};

export default CSSModules(DemoPage, styles) as () => JSX.Element;
