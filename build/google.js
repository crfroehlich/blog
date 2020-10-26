const config = require('../config');

const google = [{
  resolve: `gatsby-plugin-gtag`,
  options: {
    trackingId: config.gatsby.gaTrackingId,
    head: true,
    anonymize: false,
  },
}];

module.exports = google;
