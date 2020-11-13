import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import { getConfig } from '../../config';

const config = getConfig();

export const SEO = ({ title, slug }): JSX.Element => {
  const { site } = useStaticQuery(
    graphql`
      query GetSiteQuery {
        site {
          siteMetadata {
            title
            docsLocation
          }
        }
      }
    `,
  );

  useState(site);

  const canonicalUrl = `${config.gatsby.siteUrl}${slug || ''}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};
