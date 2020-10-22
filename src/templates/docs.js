import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { Layout, Link } from '$components';
import NextPrevious from '../components/NextPrevious';
import config from '../../config';
import { Edit, StyledHeading, StyledMainWrapper } from '../components/styles/Docs';
import NotFound from '../components/NotFound';
import AllTags from '../components/AllTags';
const gitHub = require('../components/images/github.svg');
const forcedNavOrder = config.sidebar.forcedNavOrder;

export default class BlogDocument extends Component {
  render() {

    const { data, path } = this.props;
    
    const {
      allMdx,
      mdx,
    } = data;

    if (!data || !data.site) {
      return <NotFound data={this.props} mdx={mdx} nav={nav} />;
    }
   
    const {
      site: {
        siteMetadata: { docsLocation, title },
      },
    } = data;

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
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if(path === '/tags') {
      return <AllTags props={this.props} mdx={mdx} nav={nav} />;
    } else if(path.startsWith('/tags')) {
      return <Div />
    }
    
    // meta tags
    const metaTitle = (mdx) ? mdx.frontmatter.metaTitle : '';
    const metaDescription = (mdx) ? mdx.frontmatter.metaDescription : '';
    const date = (mdx) ? mdx.frontmatter.metaDate : '';

    let canonicalUrl = config.gatsby.siteUrl;
    canonicalUrl = config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;
    canonicalUrl = canonicalUrl + ((mdx) ? mdx.fields.slug : '');

    return (
      <Layout {...this.props}>
        <Helmet>
          {metaTitle ? <title>{metaTitle}</title> : null}
          {metaTitle ? <meta name="title" content={metaTitle} /> : null}
          {metaDescription ? <meta name="description" content={metaDescription} /> : null}
          {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
          {metaDescription ? <meta property="og:description" content={metaDescription} /> : null}
          {metaTitle ? <meta property="twitter:title" content={metaTitle} /> : null}
          {metaDescription ? (
            <meta property="twitter:description" content={metaDescription} />
          ) : null}
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className={'titleWrapper'}>
          <StyledHeading>{title}<span></span></StyledHeading>
          <Edit className={'mobileView'}>
            {docsLocation && (
              <Link className={'gitBtn'} to={`${docsLocation}/${mdx.parent.relativePath}`}>
                <img src={gitHub} alt={'Github logo'} /> Source
              </Link>
            )}
          </Edit>
        </div>
        <StyledMainWrapper>
          <MDXRenderer>{(mdx) ? mdx.body : '<div/>'}</MDXRenderer>
          <i>{date}</i>
        </StyledMainWrapper>
        <div className={'addPaddTopBottom'}>
          <NextPrevious mdx={mdx} nav={nav} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
        date
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        metaDescription
        metaDate
      }
    }
    allMdx {
      edges {
        node {
          fields {
            slug
            title
            date
          }
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
