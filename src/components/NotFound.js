import React from 'react';
import { Layout, Link } from '$components';
import Helmet from 'react-helmet';
import NextPrevious from '../components/NextPrevious';
import config from '../../config';
import { StyledHeading, StyledMainWrapper } from '../components/styles/Docs';

const NotFound = ({ data, mdx, nav }) => {
  // meta tags
  const metaTitle = (mdx && mdx.frontmatter) ? mdx.frontmatter.metaTitle : '';
  const metaDescription = (mdx && mdx.frontmatter) ? mdx.frontmatter.metaDescription : '';
  let canonicalUrl = config.gatsby.siteUrl;
  canonicalUrl = config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;
  canonicalUrl = canonicalUrl + ((mdx) ? mdx.fields.slug : '');

  return (
    <Layout {...data}>
        <Helmet>
          {metaTitle ? <title>{metaTitle}</title> : null}
          {metaTitle ? <meta name="title" content={metaTitle} /> : null}
          {metaDescription ? <meta name="description" content={metaDescription} /> : null}
          {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
          {metaDescription ? <meta property="og:description" content={metaDescription} /> : null}
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className={'titleWrapper'}>
          <StyledHeading>Trail Closed for Maintenance</StyledHeading>
        </div>
        <StyledMainWrapper>Sadly, your journey to {data.path} ends here. <Link to={'/'}>Go back</Link> to the beginning; consider the navel and its many wonders; cast your gaze inward and skyward and outbetween.</StyledMainWrapper>
        <div className={'addPaddTopBottom'}>
          <NextPrevious mdx={mdx} nav={nav} />
        </div>
      </Layout>
  );
};

export default NotFound;
