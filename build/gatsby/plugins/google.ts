import { addConfig } from '../../../config';

export const addGoogle: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: `gatsby-plugin-gtag`,
    options: {
      trackingId: config.gatsby.gaTrackingId,
      head: true,
      anonymize: false,
    },
  });
};
