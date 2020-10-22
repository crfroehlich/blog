import React from 'react';
import { Layout, Link } from '$components';
import Helmet from 'react-helmet';
import NextPrevious from './NextPrevious';
import config from '../../config';
import { StyledHeading, StyledMainWrapper } from './styles/Docs';
import { kebabCase } from 'lodash';

const AllTags = ({ props, mdx, nav }) => {
  console.log([props, mdx, nav])
  
  const metaTitle = (mdx && mdx.frontmatter) ? mdx.frontmatter.metaTitle : '';
  const metaDescription = (mdx && mdx.frontmatter) ? mdx.frontmatter.metaDescription : '';
  let canonicalUrl = config.gatsby.siteUrl;
  canonicalUrl = config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;
  canonicalUrl = canonicalUrl + ((mdx) ? mdx.fields.slug : '');

  const {
    data: {
      allMdx: { group },
      site: {
        siteMetadata: { title },
      },
    }
  } = props;
  
  return (
    <Layout {...props}>
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
        <StyledMainWrapper>
          <h1>Tags</h1>
          <ul>
            {group.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </StyledMainWrapper>
        <div className={'addPaddTopBottom'}>
          <NextPrevious mdx={mdx} nav={nav} />
        </div>
      </Layout>
  );
};

export default AllTags;
