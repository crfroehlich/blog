import { addConfig } from '../../../config';

export const addStats: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: 'gatsby-plugin-bundle-stats',
    options: {
      compare: true,
      outDir: '../artifacts',
      stats: {
        context: './src',
      },
    },
  });
};
