import type { GatsbyConfig, PluginRef } from 'gatsby';
import { getConfig } from '../../config';
import {
  addCodegen,
  addContent,
  addFonts,
  addGoogle,
  addMdx,
  addOffline,
  addRobots,
  addRss,
} from './plugins';

const config = getConfig();

const plugins: Array<PluginRef> = [
  'gatsby-plugin-catch-links',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-plugin-sass',
  'gatsby-plugin-sharp',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-ts',
  'gatsby-remark-images',
  'gatsby-transformer-sharp',
];

addCodegen(config, plugins);
addContent(config, plugins);
addFonts(config, plugins);
addGoogle(config, plugins);
addMdx(config, plugins);
addOffline(config, plugins);
addRobots(config, plugins);
addRss(config, plugins);

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
