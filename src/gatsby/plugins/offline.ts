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

// check and add pwa functionality
if (config.pwa && config.pwa.enabled && config.pwa.manifest) {
  offline.push({
    resolve: `gatsby-plugin-manifest`,
    options: { ...config.pwa.manifest },
  });
  offline.push({
    resolve: 'gatsby-plugin-offline',
    options: {
      appendScript: sw,
    },
  });
} else {
  offline.push('gatsby-plugin-remove-serviceworker');
}

export default offline;
