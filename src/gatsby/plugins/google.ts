import { config } from '../../../config';

export const google = [{
  resolve: `gatsby-plugin-gtag`,
  options: {
    trackingId: config.gatsby.gaTrackingId,
    head: true,
    anonymize: false,
  },
}];

export default google;
