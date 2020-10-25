import React from 'react';
import { Layout } from './layout';
import { DisplayDate, Link } from './link';
import Helmet from 'react-helmet';
import NextPrevious from './NextPrevious';
import config from '../../config';
import { Edit, StyledHeading, StyledMainWrapper } from './styles/Docs';
import {BadgeAnchor, Badge, ChipSet, Chip} from 'rmwc';
import { kebabCase } from 'lodash';
import Comments from './Comments';

const gitHub = require('./images/github.svg');

const forcedNavOrder = config.sidebar.forcedNavOrder;

export const PageWrapper = ({ props, pageContent, pageTitle, showGithub, showComments }) => {
  const { data } = props;

  const {
    allMdx,
    mdx,
  } = data;

  let site,
    siteMetadata,
    title = pageTitle,
    body,
    docsLocation,
    date = new Date(),
    tags = [];

  if(data && data.site) {
    site = data.site;
    siteMetadata = site.siteMetadata;
    docsLocation = siteMetadata.docsLocation;
  }

  title = title || 'No Title';
  let description = title;

  if(pageContent) {
    body = pageContent;
  }

  if(mdx) {
    if(mdx.frontmatter) {
      title = mdx.frontmatter.metaTitle || title;
      description = mdx.frontmatter.metaDescription || title;
    }
    if(!body) {
      body = mdx.body;
    }
    if(mdx.fields.date) {
      date = new Date(mdx.fields.date);
    }
    if(mdx.fields.tags) {
      tags = mdx.fields.tags;
    }
  }

  if(!title && siteMetadata) {
    title = siteMetadata.title;
  }

  let canonicalUrl = `${config.gatsby.siteUrl}`;

  canonicalUrl = config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;
  canonicalUrl = canonicalUrl + ((mdx) ? mdx.fields.slug : '');

  let navItems = [];

  if(allMdx && allMdx.edges) {
    navItems = allMdx.edges
      .map(({ node }) => node.fields.slug)
      .filter(slug => slug !== '/')
      .reverse()
      .reduce(
        (acc, cur) => {
          if (forcedNavOrder.find(url => url === cur)) {
            return { ...acc, [cur]: [cur] };
          }

          let prefix = cur.split('/')[1];

          if (config.gatsby && config.gatsby.trailingSlash) {
            prefix = prefix + '/';
          }

          if (prefix && forcedNavOrder.find(url => url === `/${prefix}`)) {
            return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] };
          } else {
            return { ...acc, items: [...acc.items, cur] };
          }
        },
        { items: [] }
      );
  }
  const nav = forcedNavOrder
    .reduce((acc, cur) => {
      return acc.concat(navItems[cur]);
    }, [])
    .concat(navItems.items)
    .map(slug => {
      if (slug) {
        const { node } = allMdx.edges.find(({ node }) => node.fields.slug === slug);

        return node.fields;
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const chipMap = {};

  if(tags && tags.length > 0) {
    tags.forEach(t => {
      window.allMdxGroup = allMdx.group;
      chipMap[t] = allMdx.group.find(group => group.fieldValue === t).totalCount;
    })
  }

  const chips = (<ChipSet>
    {tags.map(tag => (
      <Link to={`/визуализации/${kebabCase(tag)}`}
        key={kebabCase(tag)}
        style={{ marginRight: '0.5rem' }}
        >
        <BadgeAnchor>
          <Chip style={{ backgroundColor: '#1ed3c6', color: 'fff' }}
            id={tag}
            label={tag}
          />
          <Badge label={chipMap[tag]} style={{ backgroundColor: 'cadetblue', right: '-0.3rem', top: '-0.3rem' }}/>
        </BadgeAnchor>
      </Link>
    ))}
    {mdx && (<DisplayDate style={{color: '#1ed3c6'}} date={date} />)}
 </ChipSet>);

  return (
    <Layout {...props}>
        <Helmet>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className={'titleWrapper'}>
          <StyledHeading>{title}</StyledHeading>
          {showGithub && docsLocation &&
            (<Edit className={'mobileView'}>
              <Link className={'gitBtn'} to={`${docsLocation}/${mdx.parent.relativePath}`}>
                <img src={gitHub} alt={'Github logo'} /> Source
              </Link>
            </Edit>)}
        </div>
        <StyledMainWrapper>
          {chips}
          {body}
        </StyledMainWrapper>
        { showComments && (<div id="comment_div"><Comments id={"comment_div"}/></div>)}
        <div className={'addPaddTopBottom'}>
          <NextPrevious mdx={mdx} nav={nav} />
        </div>
        <script
            defer
            async={true}
            src={'https://utteranc.es/client.js'}
            repo={'crfroehlich/blog'}
            issue-term={'pathname'}
          />
      </Layout>
  );
};

export default PageWrapper;
