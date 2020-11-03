import React from 'react';
import { graphql } from 'gatsby';
import NotFound from '../components/NotFound';

export const PageNotFound: React.FC<any> = ({ props }): JSX.Element => <NotFound props={props} />;

export default PageNotFound;

export const pageQuery = graphql`
  query Get404Query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
