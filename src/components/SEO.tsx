import React from 'react';
import { Helmet } from 'react-helmet';
import { IPageProps } from '../types';

export const SEO: React.FC<IPageProps> = (props): JSX.Element => {
  const {
    location,
    pageContext: { title },
  } = props;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <link rel="canonical" href={location.href} />
    </Helmet>
  );
};
