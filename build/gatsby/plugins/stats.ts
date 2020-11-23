import { addConfig } from '../../../config';

export const addStats: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: 'gatsby-plugin-bundle-stats',
    options: {
      compare: true,
      outDir: '../dist',
    },
  });
  plugins.push({
    resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
    options: {
      analyzerMode: 'json',
      reportFilename: 'stats.html',
      generateStatsFile: true,
      statsOptions: {
        context: './src',
        assets: true,
        entrypoints: true,
        chunks: true,
        modules: true,
      },
    },
  });
};
