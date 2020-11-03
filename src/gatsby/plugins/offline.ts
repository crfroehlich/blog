import { config } from '../../../config';

export const offline = [];

if (config.pwa?.manifest) {
  const manifest = {
    resolve: `gatsby-plugin-manifest`,
    options: { ...config.pwa.manifest },
  };
  if (config.pwa?.enabled) {
    manifest.options.cache_busting_mode = 'none';
  }
  offline.push(manifest);
}
if (config.pwa?.enabled) {
  offline.push({
    resolve: 'gatsby-plugin-offline',
    options: {
      appendScript: require.resolve('./workbox.js'),
    },
  });
}
if (offline.length === 0) {
  offline.push('gatsby-plugin-remove-serviceworker');
}

export default offline;
