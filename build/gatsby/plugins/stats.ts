import { addConfig } from '../../../config';
import { env } from '../../initEnv';

export const addStats: addConfig = (config, plugins): void => {
  if(!(env.GATSBY_BUILD_MODE?.length > 0)) return;

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
