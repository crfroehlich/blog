import React from "react"
import PropTypes from "prop-types"
// Components
import { Link, graphql } from "gatsby"
const Tags = ({ pageContext, data }) => {
  console.warn('THIS _should_ !not! *happen*');

  const { tag } = pageContext;

  const { edges, totalCount } = data.allMdx;

  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;

  return (
    <div>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields

          const { title } = node.frontmatter

          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <Link to="/визуализации">визуализации</Link>
    </div>
  )
};

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
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
  }`;
