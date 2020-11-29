import { addConfig } from '../../../config';

const worker = require.resolve('./workbox.js');

export const addOffline: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: `gatsby-plugin-manifest`,
    options: {
      cache_busting_mode: 'none',
      background_color: '#6b37bf',
      crossOrigin: 'use-credentials',
      display: 'standalone',
      icon: './static/favicon.svg',
      name: 'Hiking My Desk',
      short_name: 'HikingMyDesk',
      start_url: '/',
      theme_color: '#6b37bf',
    },
  });
  const precachePages = ['/визуализации', '/этикетка/**', '/тег/**'];
  for (let year = 1995; year <= 2080; year += 1) {
    precachePages.push(`/${year}/**`);
  }
  plugins.push({
    resolve: 'gatsby-plugin-offline',
    options: {
      appendScript: worker,
      precachePages,
      workboxConfig: {

      },
    },
  });
};
