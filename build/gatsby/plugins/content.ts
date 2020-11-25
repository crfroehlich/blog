import { addConfig } from '../../../config';

const resolve = 'gatsby-source-filesystem';

export const addContent: addConfig = (config, plugins): void => {
  plugins.push({
    resolve,
    options: {
      name: 'docs',
      path: `${__dirname}/../../../content/posts`,
    },
  });

  plugins.push({
    resolve,
    options: {
      name: 'src',
      path: `${__dirname}/../../../content/src`,
    },
  });

  plugins.push({
    resolve,
    options: {
      name: 'assets',
      path: `${__dirname}/../../../content/assets`,
    },
  });
};
