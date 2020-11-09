import React from 'react';
import Helmet from 'react-helmet';
import { BadgeAnchor, Badge, ChipSet, Chip } from 'rmwc';
import kebabCase from 'lodash/kebabCase';
import { Layout } from './Layout';
import { DisplayDate, Link } from './Link';
import { NextPrevious } from './NextPrevious';
import { config } from '../../config';
import { Edit, StyledHeading, StyledMainWrapper } from './styles/Docs';
import { Comments } from './Comments';
import { IProps, INode } from '../types/interfaces';

export const PageWrapper: React.FC<IProps> = ({
  props,
  pageContent,
  pageTitle,
  showGithub,
  showComments,
}): JSX.Element => {
  const { data, pageContext } = props;

  const { allMdx, mdx } = data;

  let site;
  let siteMetadata;
  let title = pageTitle;
  let body;
  let docsLocation;
  let date = new Date();
  let tags = [];
  const { next, previous } = pageContext;

  if (data?.site) {
    site = data.site;
    siteMetadata = site.siteMetadata;
    docsLocation = siteMetadata.docsLocation;
  }

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
    if (mdx.fields.tags) {
      tags = mdx.fields.tags;
    }
  }

  if (!title && siteMetadata) {
    title = siteMetadata.title;
  }

  let canonicalUrl = `${config.gatsby.siteUrl}`;

  canonicalUrl =
    config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;
  canonicalUrl += mdx ? mdx.fields.slug : '';

  const chipMap = {};

  if (tags && tags.length > 0) {
    tags.forEach((t) => {
      const tag = allMdx.group.find((group) => group.fieldValue === t);

      chipMap[t] = tag ? tag.totalCount : 1;
    });
  }

  const chips = (
    <ChipSet>
      {tags.map((tag) => (
        <Link to={`/тег/${kebabCase(tag)}`} key={kebabCase(tag)} style={{ marginRight: '0.5rem' }}>
          <BadgeAnchor>
            <Chip style={{ backgroundColor: '#1ed3c6', color: 'fff' }} id={tag} label={tag} />
            <Badge
              label={chipMap[tag]}
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
              <img src={'../github.svg'} alt={'Github logo'} /> Source
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
