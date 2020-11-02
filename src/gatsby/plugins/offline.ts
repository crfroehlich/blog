import { config } from '../../../config';

const sw = `
workbox.routing.registerRoute(
  new RegExp('https:.*min.(css|js)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cdn-cache',
  })
);
`;

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
      appendScript: sw,
    },
  });
}
if (offline.length === 0) {
  offline.push('gatsby-plugin-remove-serviceworker');
}

export default offline;
