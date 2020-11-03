export const robots = {
  resolve: 'gatsby-plugin-robots-txt',
  options: {
    policy: [{ userAgent: '*', allow: '/' }],
  },
};

export default robots;
