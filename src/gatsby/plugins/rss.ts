export const rss = [
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        query GetRssFeedQuery {
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
          serialize: ({ query: { site, allMdx } }) => {
            return allMdx.edges.map((edge) => {
              return {
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.fields.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              };
            });
          },
          query: `
          query GetAllRssMdxQuery {
              allMdx(
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
