import React, { Component } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { BadgeAnchor, Badge, ChipSet, Chip } from 'rmwc';
import kebabCase from 'lodash/kebabCase';
import { IPageProps, INode } from '../types/interfaces';
import {
  Comments,
  DisplayDate,
  Edit,
  Icon,
  Layout,
  Link,
  NextPrevious,
  SEO,
  StyledHeading,
  StyledMainWrapper,
} from '../components';
import { getConfig } from '../../config';

const config = getConfig();

export default class Article extends Component<IPageProps> {
  render(): JSX.Element {
    const {
      data,
      pageContext: { next, previous, pageTags },
    } = this.props;
    const { mdx } = data;
    const { title } = mdx.fields;
    const date = new Date(mdx.fields.date);
    console.log(this.props)
    return (
      <Layout {...this.props}>
        <SEO title={title} slug={mdx.fields.slug} />
        <div className={'titleWrapper'}>
          <StyledHeading>{title}</StyledHeading>
          <Edit className={'mobileView'}>
            <Link
              className={'gitBtn'}
              to={`${config.siteMetadata.docsLocation}/${(mdx?.parent as INode)?.relativePath}`}
            >
              {Icon({ icon: ['fab', 'github'] })}
              <div style={{ paddingLeft: '5px' }}>Source</div>
            </Link>
          </Edit>
        </div>
        <StyledMainWrapper>
          <ChipSet>
            {pageTags.map((tag) => (
              <Link
                to={`/тег/${kebabCase(tag.name)}`}
                key={kebabCase(tag.name)}
                style={{ marginRight: '0.5rem' }}
              >
                <BadgeAnchor>
                  <Chip style={{ backgroundColor: '#1ed3c6', color: 'fff' }} label={tag.name} />
                  <Badge
                    label={tag.count}
                    style={{ backgroundColor: 'cadetblue', right: '-0.3rem', top: '-0.3rem' }}
                  />
                </BadgeAnchor>
              </Link>
            ))}
            <DisplayDate style={{ color: '#1ed3c6' }} date={date} />
          </ChipSet>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </StyledMainWrapper>
        <div id="comment_div">
          <Comments id={'comment_div'} />
        </div>
        <div className={'addPaddTopBottom'}>
          <NextPrevious next={next} prev={previous} />
        </div>
      </Layout>
    );
  }
}

export const articleQuery = graphql`
  query GetPageByIdQuery($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
        date
        tags
        img
      }
      body
      tableOfContents
    }
  }
`;
