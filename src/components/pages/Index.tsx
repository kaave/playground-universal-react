import * as React from 'react';

import * as Meta from '~/value-objects/meta';
import { updateMeta } from '~/services/metaService';

export const meta: Meta.Meta = Meta.create({
  title: 'root page',
  description: 'root page description',
});

export class IndexPage extends React.Component {
  componentDidMount() {
    updateMeta(meta);
  }

  render() {
    return <section className="Index">index</section>;
  }
}
