import { addConfig } from '../../../config';

export const addOffline: addConfig = (config, plugins): void => {
  if (config.offline?.manifest) {
    const manifest = {
      resolve: `gatsby-plugin-manifest`,
      options: { ...config.offline.manifest },
    };
    if (config.offline?.enabled) {
      manifest.options.cache_busting_mode = 'none';
    }
    plugins.push(manifest);
  }
  if (config.offline?.enabled) {
    plugins.push({
      resolve: 'gatsby-plugin-offline',
      options: {
        appendScript: require.resolve('./workbox.js'),
      },
    });
  } else {
    plugins.push('gatsby-plugin-remove-serviceworker');
  }
};
