import * as React from 'react';

import { Meta as MetaType } from '~/value-objects/meta';

interface Props {
  meta: MetaType;
}

export const Meta: React.FC<Props> = ({ meta: { title, description, image, og, twitter } }) => {
  return (
    <>
      {title && (
        <>
          <title>{title}</title>
          <meta itemProp="name" content={title} />
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </>
      )}

      {description && (
        <>
          <meta name="description" content={description} />
          <meta itemProp="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}

      {image && (
        <>
          <meta itemProp="image" content={image} />
          <meta property="og:image" content={image} />
          <meta name="twitter:image" content={image} />
        </>
      )}

      {og && og.type && <meta property="og:type" content={og.type} />}
      {og && og.url && <meta property="og:url" content={og.url} />}
      {twitter && twitter.card && <meta name="twitter:card" content={twitter.card} />}
      {twitter && twitter.site && <meta name="twitter:site" content={twitter.site} />}
    </>
  );
};
