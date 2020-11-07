import React, { Component } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { PageWrapper } from '../components/PageWrapper';
import { IPageProps } from '../types/interfaces';
import { Empty } from '../components/Empty';

export default class Article extends Component<IPageProps> {
  render(): JSX.Element {
    const { data } = this.props;

    const { mdx } = data;

    let pageContent = <Empty />;

    if (data.site) {
      if (mdx?.body) {
        pageContent = <MDXRenderer>{mdx.body}</MDXRenderer>;
      }
    }

    let ret = <Empty />;
    try {
      ret = (
        <PageWrapper
          props={this.props}
          pageContent={pageContent}
          showGithub={true}
          showComments={true}
        />
      );
    } catch (e) {
      console.error(e);
      debugger;
    }

    return ret;
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
    }
    allMdx {
      edges {
        node {
          fields {
            id
            title
            slug
            date
          }
          parent {
            ... on File {
              relativePath
            }
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
