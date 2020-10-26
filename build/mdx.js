const mdx = [{
  resolve: 'gatsby-plugin-mdx',
  options: {
    gatsbyRemarkPlugins: [
      {
        resolve: 'gatsby-remark-images',
        options: {
          maxWidth: 400,
          sizeByPixelDensity: true
        }
      },
      {
        resolve: 'gatsby-remark-copy-linked-files'
      }
    ],
    extensions: ['.mdx', '.md']
  }
}];

module.exports = mdx;
