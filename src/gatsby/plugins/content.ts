import { addConfig } from '../../../config';

export const addContent: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: `${__dirname}/../../../content/posts`,
    },
  });
};
