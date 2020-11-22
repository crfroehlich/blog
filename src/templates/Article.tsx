import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import React from 'react';
import {
  Comments,
  NextPrevious,
  PageTitle,
} from '../components';
import { INode, IPageProps } from '../types';
import { StyledMainWrapper} from '../styles';
import { getConfig } from '../../config';

const config = getConfig();

export const Article: React.FC<IPageProps> = (props): JSX.Element => {
  const {
    pageContext: { mdx, next, previous, pageTags },
  } = props;
  if (!mdx) return null;
  const { title, subtitle } = mdx.fields;
  const date = new Date(mdx.fields.date);
  
  return (
    <div>
      <PageTitle 
        title={title} 
        subtitle={subtitle} 
        gitHubPath={`${config.siteMetadata.docsLocation}/${(mdx.parent as INode)?.relativePath}`} 
        tags={pageTags} 
        tagLinkPrefix={'тег'}
        date={date}
      />
      <StyledMainWrapper>
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
};

export default Article;
