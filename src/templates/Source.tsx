import React, { Component } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { BadgeAnchor, Badge, ChipSet, Chip } from 'rmwc';
import kebabCase from 'lodash/kebabCase';
import { IPageProps } from '../types/interfaces';
import { DisplayDate, Edit, Icon, Link, StyledHeading, StyledMainWrapper } from '../components';

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
          <ChipSet>
            {pageLabels.map((label) => (
              <Link
                to={`/этикетка/${kebabCase(label.name)}`}
                key={kebabCase(label.name)}
                style={{ marginRight: '0.5rem' }}
              >
                <BadgeAnchor>
                  <Chip style={{ backgroundColor: '#1ed3c6', color: 'fff' }} label={label.name} />
                  <Badge
                    label={label.count}
                    style={{ backgroundColor: 'cadetblue', right: '-0.3rem', top: '-0.3rem' }}
                  />
                </BadgeAnchor>
              </Link>
            ))}
            <DisplayDate style={{ color: '#1ed3c6' }} date={updated} />
          </ChipSet>
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
