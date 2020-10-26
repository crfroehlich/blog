const layout = [{
  resolve: `gatsby-plugin-layout`,
  options: {
      component: require.resolve(`../src/templates/docs.js`)
  }
}];

module.exports = layout;
