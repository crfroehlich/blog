import React from 'react';
import { graphql } from 'gatsby';
import { IProps } from '../types';
import { Link, Layout, StyledHeading, StyledMainWrapper, SEO } from '../components';

export const PageNotFound: React.FC<IProps> = ({ props }): JSX.Element => {
  const { path } = props;
  const title = 'This Trail Closed for Maintenance';

  return (
    <Layout {...props}>
      <SEO title={title} slug={'404'} />
      <div className={'titleWrapper'}>
        <StyledHeading>{title}</StyledHeading>
      </div>
      <StyledMainWrapper>
        <div>
          Sadly, your journey to <code>{path}</code> ends here. <Link to={'/'}>Go back</Link> to the
          beginning; consider the navel and its many wonders; cast your gaze inward and skyward and
          outbetween.
        </div>
      </StyledMainWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query Get404Query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
