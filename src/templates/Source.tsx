import React, { Component } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { IPageProps } from '../types/interfaces';
import { PageTitle } from '../components';
import { StyledMainWrapper } from '../styles';

export default class Source extends Component<IPageProps> {
  render(): JSX.Element {
    const {
      data,
      pageContext: { pageLabels },
    } = this.props;
    const { mdx } = data;
    const { title, github } = mdx.fields;
    const updated = new Date(mdx.fields.updated);

    return (
      <div>
        <PageTitle 
          title={title} 
          gitHubPath={github} 
          tags={pageLabels} 
          tagLinkPrefix={'этикетка'}
          date={updated}
        />
        <StyledMainWrapper>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </StyledMainWrapper>
      </div>
    );
  }
}

export const sourceQuery = graphql`
  query GetSourceByIdQuery($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
        created
        updated
        github
        labels
      }
      body
      tableOfContents
    }
  }
`;
