require('dotenv').config();

const config = require('./config');

let plugins = [
  'gatsby-plugin-emotion',
  'gatsby-plugin-playground',
  'gatsby-plugin-playground',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-plugin-sharp',
  'gatsby-plugin-sitemap',
  'gatsby-transformer-remark',
];

[
  'content',
  'google',
  'layout',
  'mdx',
  'offline',
  'rss',
  'search',
].forEach(p => {
  plugins = plugins.concat(require(`./build/${p}`));
})

module.exports = {
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
