import React, { Component } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { ArticleWrapper } from '../components/ArticleWrapper';
import { IPageProps } from '../types/interfaces';
import { Empty } from '../components/Empty';

export default class Article extends Component<IPageProps> {
  render(): JSX.Element {
    const { data } = this.props;
    const { mdx } = data;
    let pageContent = <Empty />;

    if (data?.site && mdx?.body) {
      pageContent = <MDXRenderer>{mdx.body}</MDXRenderer>;
    }

    let ret = <Empty />;
    try {
      ret = (
        <ArticleWrapper
          props={this.props}
          pageContent={pageContent}
          showGithub={true}
          showComments={true}
        />
      );
    } catch (e) {
      console.error(e);
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
    }
  }
`;
