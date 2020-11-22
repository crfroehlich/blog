import React from 'react';
import { graphql } from 'gatsby';
import { Link, PageTitle } from '../components';
import { StyledMainWrapper } from '../styles';

export const Label = (props): JSX.Element => {
  const {
    data: {
      allMdx: { edges },
    },
    pageContext: { title },
  } = props;

  return (
    <div>
      <PageTitle title={title} />
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
};

export default Label;

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
