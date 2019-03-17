import * as React from 'react';

import styles from './style.css';
import * as Meta from '~/value-objects/meta';
import { updateMeta } from '~/services/metaService';

export const meta: Meta.Meta = Meta.create({
  title: 'demo page',
  description: 'demo page description',
});

export const DemoPage: React.FC<{}> = () => {
  React.useEffect(() => updateMeta(meta), []);

  return <section className="Demo">demo</section>;
};
