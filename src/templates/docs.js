import React, { Component } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import NotFound from '../components/NotFound';
import Chips from '../components/Chips';
import PageWrapper from '../components/PageWrapper';

export default class BlogDocument extends Component {
  render() {

    const { data, path } = this.props;
    
    const { mdx } = data;

    const decodedPath = (decodeURIComponent) ? decodeURIComponent(path) : path;

    if(decodedPath === '/визуализации') {
      console.log(this.props)
      return <Chips props={this.props} />;
    } else if(path.startsWith('/визуализации')) {
      return null;
    } else if (!data.site) {
      return <NotFound props={this.props} />;
    } else {
      return <PageWrapper
        props={this.props}
        pageContent={<MDXRenderer>{mdx.body}</MDXRenderer>}
        showGithub={true}
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
