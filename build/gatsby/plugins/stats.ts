import { addConfig } from '../../../config';

export const addStats: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
    options: {
      analyzerMode: 'json',
    },
  });
};
