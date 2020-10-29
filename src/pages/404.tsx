import React from "react"
import { graphql } from "gatsby"

export const PageNotFound = () => (
  <div>
  </div>
);

export default PageNotFound;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }`;
