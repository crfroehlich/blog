import React, { Component } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import NotFound from '../components/NotFound';
import Chips from '../components/Chips';
import PageWrapper from '../components/PageWrapper';
import Cards from '../components/Cards';

export default class BlogDocument extends Component {
  render() {

    const { data, path } = this.props;

    const { mdx } = data;

    const decodedPath = (decodeURIComponent) ? decodeURIComponent(path) : path;

    if(decodedPath === '/визуализации') {

      return <Chips props={this.props} />;
    } else if(decodedPath.startsWith('/визуализации')) {
      return <Cards props={this.props} />;
    } else if (!data.site || !mdx) {
      return <NotFound props={this.props} />;
    } else {
      return <PageWrapper
        props={this.props}
        pageContent={<MDXRenderer>{(mdx)? mdx.body : 'text'}</MDXRenderer>}
        showGithub={true}
        showComments={true}
      />
    }
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
        tags
        img
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
            id
            title
            slug
            date
            tags
            img
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
      }
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
