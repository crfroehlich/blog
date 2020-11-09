import { addConfig } from '../../../config';

export const addSearch: addConfig = (config, plugins): void => {
  const pageQuery = `query GetSearchQuery {
    pages: allMdx {
      edges {
        node {
          objectID: id
          fields {
            slug
          }
          headings {
            value
          }
          frontmatter {
            title
            subtitle
            tags
            img
            date
          }
          excerpt(pruneLength: 50000)
        }
      }
    }
  }`;

  const flatten = (arr) =>
    arr.map(({ node: { frontmatter, fields, ...rest } }) => ({
      ...frontmatter,
      ...fields,
      ...rest,
    }));

  const settings = { attributesToSnippet: [`excerpt:20`] };

  const indexName = config.header.search ? config.header.search.indexName : '';

  const queries = [
    {
      query: pageQuery,
      transformer: ({ data }) => flatten(data.pages.edges),
      indexName: `${indexName}`,
      settings,
    },
  ];

  if (config.header?.search?.enabled !== true) return;

  plugins.push({
    resolve: `gatsby-plugin-algolia`,
    options: {
      appId: config.header.search.algoliaAppId, // algolia application id
      apiKey: config.header.search.algoliaAdminKey, // algolia admin key to index
      queries,
      chunkSize: 10000, // default: 1000
    },
  });
};
