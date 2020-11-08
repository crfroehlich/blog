import type { GatsbyConfig, PluginRef } from 'gatsby';
import { env } from './build/initEnv';
import { getConfig } from './config';
import {
  codegen,
  content,
  fonts,
  google,
  mdx,
  offline,
  robots,
  rss,
  search,
  stats,
} from './src/gatsby/plugins';

const config = getConfig(env);

let plugins: Array<PluginRef> = [
  'gatsby-plugin-catch-links',
  'gatsby-plugin-dark-mode',
  'gatsby-plugin-emotion',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-plugin-sass',
  'gatsby-plugin-sharp',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-ts',
  'gatsby-transformer-sharp',
];

plugins = plugins.concat(codegen);
plugins = plugins.concat(content);
plugins = plugins.concat(fonts);
plugins = plugins.concat(google);
plugins = plugins.concat(mdx);
plugins = plugins.concat(offline);
plugins = plugins.concat(robots);
plugins = plugins.concat(rss);
plugins = plugins.concat(search);
plugins = plugins.concat(stats);

export const gatsbyConfig: GatsbyConfig = {
  plugins,
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    docsLocation: config.siteMetadata.docsLocation,
    ogImage: config.siteMetadata.ogImage,
    favicon: config.siteMetadata.favicon,
    logo: {
      link: config.header.logoLink ? config.header.logoLink : '/',
      image: config.header.logo,
    },
    headerTitle: config.header.title,
    githubUrl: config.header.githubUrl,
    helpUrl: config.header.helpUrl,
    tweetText: config.header.tweetText,
    headerLinks: config.header.links,
    siteUrl: config.gatsby.siteUrl,
  },
};

export default gatsbyConfig;
