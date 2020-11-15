import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Link, StyledHeading, StyledMainWrapper } from '../components';
import { IPageProps } from '../types/interfaces';

export default class Label extends Component<IPageProps> {
  render(): JSX.Element {
    const {
      data: {
        allMdx: { edges },
      },
      pageContext: { title },
    } = this.props;

    return (
      <div>
        <div className={'titleWrapper'}>
          <StyledHeading>{title}</StyledHeading>
        </div>
        <StyledMainWrapper>
          <ul>
            {edges.map((e, i) => (
              <li key={`gridcell_${i}_${e.node.fields.id}`}>
                <Link to={`${e.node.fields.slug}`} title={e.node.fields.title}>
                  <div>{e.node.fields.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </StyledMainWrapper>
      </div>
    );
  }
}

export const labelQuery = graphql`
  query GetLabelByNameQuery($label: String) {
    allMdx(
      sort: { fields: [frontmatter___updated], order: DESC }
      filter: {
        fileAbsolutePath: { glob: "**/content/src/**" }
        frontmatter: { labels: { in: [$label] } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            id
            title
            slug
            updated
          }
        }
      }
    }
  }
`;
