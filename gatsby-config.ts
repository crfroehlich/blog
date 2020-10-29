import dotenv from 'dotenv';
import { config } from './config';
import type { GatsbyConfig } from 'gatsby';
import { content, google, mdx, offline, rss, search } from './src/gatsby/plugins';

dotenv.config({
  path: `.env`,
});

let plugins: any[] = [
  'gatsby-plugin-emotion',
  'gatsby-plugin-playground',
  'gatsby-plugin-playground',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-plugin-sharp',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-typegen',
  'gatsby-plugin-typescript',
  'gatsby-transformer-remark',
];

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
  plugins: plugins
};

export default gatsbyConfig;
