// relativeci.config.js
module.exports = {
  // Allow the agent to pick up the current commit message
  includeCommitMessage: true,
  webpack: {
    // Path to Webpack stats JSON file
    stats: './dist/webpack-stats.json'
  }
};