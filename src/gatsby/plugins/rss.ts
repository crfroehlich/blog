export const rss = [
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
      {
          site {
          siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
          }
          }
      }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map((edge) => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.excerpt,
                date: edge.node.fields.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              });
            });
          },
          query: `
          {
              allMarkdownRemark(
              sort: { order: DESC, fields: [fields___date] },
              ) {
              edges {
                  node {
                  excerpt
                  html
                  fields {
                      slug
                      date
                      title
                  }
                  }
              }
              }
          }
          `,
          output: '/rss.xml',
          title: 'Hiking My Desk RSS Feed',
        },
      ],
    },
  },
];

export default rss;
