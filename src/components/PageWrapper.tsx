import React from 'react';
import Helmet from 'react-helmet';
import { Layout } from './Layout';
import { getConfig } from '../../config';
import { StyledHeading, StyledMainWrapper } from './styles/Docs';
import { IProps } from '../types/interfaces';

const config = getConfig();

export const PageWrapper: React.FC<IProps> = ({ props, pageContent, pageTitle }): JSX.Element => {
  const {
    data: { site },
  } = props;

  const siteMetadata = site?.siteMetadata;
  let title = pageTitle || siteMetadata?.title || 'No Title';
  let body;

  title = title || 'No Title';

  if (pageContent) {
    body = pageContent;
  }

  let canonicalUrl = `${config.gatsby.siteUrl}`;

  canonicalUrl =
    config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta property="og:title" content={title} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div className={'titleWrapper'}>
        <StyledHeading>{title}</StyledHeading>
      </div>
      <StyledMainWrapper>{body}</StyledMainWrapper>
    </Layout>
  );
};

export default PageWrapper;
