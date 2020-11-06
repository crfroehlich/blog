export const mdx = [
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 590,
            linkImagesToOriginal: true,
            sizeByPixelDensity: true,
          },
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
        },
        {
          resolve: 'gatsby-remark-prismjs',
        },
        {
          resolve: 'gatsby-remark-responsive-iframe',
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          }
        },
        {
          resolve: 'gatsby-remark-smartypants',
        },
      ],
      extensions: ['.mdx', '.md'],
    },
  },
];

export default mdx;
