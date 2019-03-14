import * as React from 'react';

import * as Meta from '~/value-objects/Meta';

export const meta: Meta.Meta = Meta.create({
  title: 'root page',
  description: 'root page description',
});

export default function IndexPage(): JSX.Element {
  return <section className="Index">index</section>;
}
