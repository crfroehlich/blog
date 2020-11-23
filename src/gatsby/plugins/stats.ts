import { addConfig } from '../../../config';

export const addStats: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: 'gatsby-plugin-bundle-stats',
    options: {
      compare: true,
      outDir: '../artifacts',
      stats: {
        context: './src',
        assets: true,
        entrypoints: true,
        chunks: true,
        modules: true
      },
    },
  });
  plugins.push({
    resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
    options: {
      analyzerMode: 'json',
    },
  });
};
