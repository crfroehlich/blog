import { addConfig } from '../../../config';

export const addContent: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: `${__dirname}/../../../content/posts`,
    },
  });

  plugins.push({
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'src',
      path: `${__dirname}/../../../content/src`,
    },
  });
  
  plugins.push({
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'assets',
      path: `${__dirname}/../../../content/assets`,
    },
  });
};
