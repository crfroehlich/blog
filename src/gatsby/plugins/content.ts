export const content = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: `${__dirname}/../../../content/posts`,
    },
  },
];

export default content;
