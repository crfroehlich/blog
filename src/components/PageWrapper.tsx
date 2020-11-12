import React from 'react';
import Helmet from 'react-helmet';
import { BadgeAnchor, Badge, ChipSet, Chip } from 'rmwc';
import kebabCase from 'lodash/kebabCase';
import { Layout } from './Layout';
import { DisplayDate, Link } from './Link';
import { NextPrevious } from './NextPrevious';
import { getConfig } from '../../config';
import { Edit, StyledHeading, StyledMainWrapper } from './styles/Docs';
import { Comments } from './Comments';
import { IProps, INode } from '../types/interfaces';
import { Icon } from './Icon';

const config = getConfig();

export const PageWrapper: React.FC<IProps> = ({
  props,
  pageContent,
  pageTitle,
  showGithub,
  showComments,
}): JSX.Element => {
  const {
    data: { mdx, site },
    pageContext: { next, previous, pageTags },
  } = props;

  const siteMetadata = site?.siteMetadata;
  let title = pageTitle;
  let body;
  const docsLocation = siteMetadata?.docsLocation;
  let date = new Date();

  title = title || 'No Title';

  if (pageContent) {
    body = pageContent;
  }

  if (mdx) {
    title = mdx.fields.title || title;
    if (!body) {
      body = mdx.body;
    }
    if (mdx.fields.date) {
      date = new Date(mdx.fields.date);
    }
  }

  if (!title && siteMetadata) {
    title = siteMetadata.title;
  }

  let canonicalUrl = `${config.gatsby.siteUrl}`;

  canonicalUrl =
    config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;
  canonicalUrl += mdx ? mdx.fields.slug : '';

  const chips = (
    <ChipSet>
      {pageTags?.map((tag) => (
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
      {mdx && <DisplayDate style={{ color: '#1ed3c6' }} date={date} />}
    </ChipSet>
  );

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta property="og:title" content={title} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div className={'titleWrapper'}>
        <StyledHeading>{title}</StyledHeading>
        {showGithub && docsLocation && (
          <Edit className={'mobileView'}>
            <Link
              className={'gitBtn'}
              to={`${docsLocation}/${(mdx?.parent as INode)?.relativePath}`}
            >
              {Icon({ icon: ['fab', 'github'] })}
              <div style={{ paddingLeft: '5px' }}>Source</div>
            </Link>
          </Edit>
        )}
      </div>
      <StyledMainWrapper>
        {chips}
        {body}
      </StyledMainWrapper>
      {showComments && (
        <div id="comment_div">
          <Comments id={'comment_div'} />
        </div>
      )}
      <div className={'addPaddTopBottom'}>
        <NextPrevious next={next} prev={previous} />
      </div>
    </Layout>
  );
};

export default PageWrapper;
