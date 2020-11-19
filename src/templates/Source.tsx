import React, { Component } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { IPageProps } from '../types/interfaces';
import { Edit, Icon, Link, StyledHeading, StyledMainWrapper, TagSet } from '../components';

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
        <div className={'titleWrapper'}>
          <StyledHeading>{title}</StyledHeading>
          <Edit className={'mobileView'}>
            <Link className={'gitBtn'} to={github}>
              {Icon({ icon: ['fab', 'github'] })}
              <div style={{ paddingLeft: '5px' }}>Source</div>
            </Link>
          </Edit>
        </div>
        <StyledMainWrapper>
          <TagSet tags={pageLabels} linkPrefix="этикетка" date={updated} />
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
