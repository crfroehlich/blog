export const layout = [{
  resolve: `gatsby-plugin-layout`,
  options: {
      component: require.resolve(`../src/templates/docs.js`)
  }
}];

export default layout;
