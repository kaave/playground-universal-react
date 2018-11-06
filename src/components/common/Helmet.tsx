import * as React from 'react';
import ReactHelmet from 'react-helmet';

export type TwitterCard = 'summary' | 'summary_large_image';
export interface HelmetProps extends React.Props<{}> {
  title: string;
  description: string;
  image?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  twitterCard?: TwitterCard;
}

const MetaImages = ({ image }: { image: string }) => {
  return (
    <>
      <meta itemProp="image" content={image} />
      <meta property="og:image" content={image} />
    </>
  );
};

export function Helmet({ title, description, children, ogType, ogUrl, ogSiteName, twitterCard, image }: HelmetProps) {
  return (
    <ReactHelmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <MetaImages image={image} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
      {twitterCard && <meta property="twitter:card" content={twitterCard} />}
      {children && children}
    </ReactHelmet>
  );
}
