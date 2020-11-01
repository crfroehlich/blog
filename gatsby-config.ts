import dotenv from 'dotenv';
import { config } from './config';
import type { GatsbyConfig } from 'gatsby';
import { codegen, content, google, mdx, offline, rss, search } from './src/gatsby/plugins';
import { getLogger } from '@luddites-me/ts-tools';

dotenv.config({
  path: `.env`,
});

const log = getLogger();

let plugins: any[] = [
  'gatsby-plugin-catch-links',
  'gatsby-plugin-dark-mode',
  'gatsby-plugin-emotion',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-plugin-sharp',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-ts',
  'gatsby-transformer-remark',
  'gatsby-transformer-sharp',
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      policy: [{ userAgent: '*', allow: '/', disallow: '/reading-list/' }],
    },
  },
  {
    resolve: `gatsby-plugin-google-fonts`,
    options: {
      fonts: [`Roboto\:300,400,500,700`, `Poppins\:300,400,500,600`],
    },
  },
];

plugins = plugins.concat(codegen);
plugins = plugins.concat(content);
plugins = plugins.concat(google);
plugins = plugins.concat(mdx);
plugins = plugins.concat(offline);
plugins = plugins.concat(rss);
plugins = plugins.concat(search);

export const gatsbyConfig: GatsbyConfig = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    docsLocation: config.siteMetadata.docsLocation,
    ogImage: config.siteMetadata.ogImage,
    favicon: config.siteMetadata.favicon,
    logo: { link: config.header.logoLink ? config.header.logoLink : '/', image: config.header.logo }, // backwards compatible
    headerTitle: config.header.title,
    githubUrl: config.header.githubUrl,
    helpUrl: config.header.helpUrl,
    tweetText: config.header.tweetText,
    headerLinks: config.header.links,
    siteUrl: config.gatsby.siteUrl,
  },
  plugins,
};

log.info('config', JSON.stringify(gatsbyConfig));

export default gatsbyConfig;
