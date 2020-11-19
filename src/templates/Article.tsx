import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import React, { Component } from 'react';
import { getConfig } from '../../config';
import {
  Comments,
  Edit,
  Icon,
  Link,
  NextPrevious,
  StyledHeading,
  StyledMainWrapper,
  TagSet,
} from '../components';
import { INode, IPageProps } from '../types/interfaces';

const config = getConfig();

export default class Article extends Component<IPageProps> {
  render(): JSX.Element {
    const {
      data,
      pageContext: { next, previous, pageTags },
    } = this.props;
    if (!data) return null;
    const { mdx } = data;
    const { title } = mdx.fields;
    const date = new Date(mdx.fields.date);

    return (
      <div className="articleWrapper">
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
          <TagSet tags={pageTags} linkPrefix={'тег'} date={date} />
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </StyledMainWrapper>
        <div id="comment_div">
          <Comments id={'comment_div'} />
        </div>
        <div className={'addPaddTopBottom'}>
          <NextPrevious next={next} prev={previous} />
        </div>
      </div>
    );
  }
}

export const articleQuery = graphql`
  query GetArticeByIdQuery($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
        date
        tags
      }
      body
    }
  }
`;
