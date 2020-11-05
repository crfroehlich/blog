import React, { Component } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { NotFound } from '../components/NotFound';
import { PageWrapper } from '../components/PageWrapper';
import { IPageProps } from '../types/interfaces';

export default class Article extends Component<IPageProps> {
  render(): JSX.Element {
    const { data } = this.props;

    const { mdx } = data;

    if (!data.site || !mdx) {
      return <NotFound props={this.props} />;
    }
    return (
      <PageWrapper
        props={this.props}
        pageContent={<MDXRenderer>{mdx ? mdx.body : 'text'}</MDXRenderer>}
        showGithub={true}
        showComments={true}
      />
    );
  }
}

export const articleQuery = graphql`
  query GetPageByIdQuery($id: String!) {
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
