import * as React from 'react';

import * as Meta from '~/value-objects/Meta';
import { updateMetaService } from '~/services/updateMetaService';

export const meta: Meta.Meta = Meta.create({
  title: 'root page',
  description: 'root page description',
});

export default class IndexPage extends React.Component {
  componentDidMount() {
    updateMetaService(meta);
  }

  render() {
    return <section className="Index">index</section>;
  }
}
