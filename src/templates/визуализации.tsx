import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { IPageProps } from '../types/interfaces';
import { Chips } from '../components/Chips';

export class визуализации extends Component<IPageProps> {
  render(): JSX.Element {
    return <Chips props={this.props} />;
  }
}

export default визуализации;

export const pageQuery = graphql`
  query GetVisualizationsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
