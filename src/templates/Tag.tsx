import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { IPageProps } from '../types/interfaces';
import { Cards } from '../components/Cards';

export class Tag extends Component<IPageProps> {
  render(): JSX.Element {
    return <Cards props={this.props} />;
  }
}

export default Tag;

export const tagQuery = graphql`
  query GetTagByNameQuery($tag: String) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___metaDate], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            id
            title
            slug
            date
            tags
            img
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
