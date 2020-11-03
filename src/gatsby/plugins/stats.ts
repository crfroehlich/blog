export const stats = {
  resolve: 'gatsby-plugin-bundle-stats',
  options: {
    compare: true,
    outDir: '../artifacts',
    stats: {
      context: './src',
    },
  },
};

export default stats;
