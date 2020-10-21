import React, { Component } from 'react';
import { Layout, Link } from '$components';
import Helmet from 'react-helmet';
import NextPrevious from '../components/NextPrevious';
import config from '../../config';
import { Edit, StyledHeading, StyledMainWrapper } from '../components/styles/Docs';

const gitHub = require('../components/images/github.svg');

const forcedNavOrder = config.sidebar.forcedNavOrder;

export const PageWrapper = ({ props, pageContent, pageTitle, showGithub }) => {
  const { data } = props;

  const {
    allMdx,
    mdx,
  } = data;

  let site, siteMetadata, title = pageTitle, body, docsLocation;

  if(data && data.site) {
    site = data.site;
    siteMetadata = site.siteMetadata;
    title = siteMetadata.title;
    docsLocation = siteMetadata.docsLocation;
  }

  title = title || 'No Title';
  let description = title;

  if(pageContent) {
    body = pageContent;
  }

  if(mdx) {
    if(mdx.frontmatter) {
      title = mdx.frontmatter.metaTitle;
      description = mdx.frontmatter.metaDescription || title;
    }
    if(!body) {
      body = mdx.body;
    }
  }

  let canonicalUrl = config.gatsby.siteUrl;

  canonicalUrl = config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;
  canonicalUrl = canonicalUrl + ((mdx) ? mdx.fields.slug : '');

  let navItems = [];

  if(allMdx && allMdx.edges) {
    navItems = allMdx.edges
      .map(({ node }) => node.fields.slug)
      .filter(slug => slug !== '/')
      .reverse()
      .reduce(
        (acc, cur) => {
          if (forcedNavOrder.find(url => url === cur)) {
            return { ...acc, [cur]: [cur] };
          }

          let prefix = cur.split('/')[1];

          if (config.gatsby && config.gatsby.trailingSlash) {
            prefix = prefix + '/';
          }

          if (prefix && forcedNavOrder.find(url => url === `/${prefix}`)) {
            return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] };
          } else {
            return { ...acc, items: [...acc.items, cur] };
          }
        },
        { items: [] }
      );
  }
  const nav = forcedNavOrder
    .reduce((acc, cur) => {
      return acc.concat(navItems[cur]);
    }, [])
    .concat(navItems.items)
    .map(slug => {
      if (slug) {
        const { node } = allMdx.edges.find(({ node }) => node.fields.slug === slug);

        return node.fields;
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Layout {...props}>
        <Helmet>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className={'titleWrapper'}>
          <StyledHeading>{title}</StyledHeading>
          {showGithub && docsLocation &&
            (<Edit className={'mobileView'}>
              <Link className={'gitBtn'} to={`${docsLocation}/${mdx.parent.relativePath}`}>
                <img src={gitHub} alt={'Github logo'} /> Source
              </Link>
            </Edit>)}
        </div>
        <StyledMainWrapper>{body}</StyledMainWrapper>
        <div className={'addPaddTopBottom'}>
          <NextPrevious mdx={mdx} nav={nav} />
        </div>
      </Layout>
  );
};

export default PageWrapper;
