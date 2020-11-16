import { addConfig } from '../../../config';

export const addStats: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: 'gatsby-plugin-bundle-stats',
    options: {
      compare: true,
      outDir: '../dist',
      stats: {
        context: './src',
        assets: true,
        entrypoints: true,
        chunks: true,
        modules: true
      },
    },
  });
};
