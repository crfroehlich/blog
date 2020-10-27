import { config } from '../../../config';

const pageQuery = `{
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
          metaDescription
        }
        excerpt(pruneLength: 50000)
      }
    }
  }
}`;

const flatten = arr =>
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

export const search = [];

if (config.header.search && config.header.search.enabled) {
  search.push({
    resolve: `gatsby-plugin-algolia`,
    options: {
      appId: config.header.search.algoliaAppId, // algolia application id
      apiKey: config.header.search.algoliaAdminKey, // algolia admin key to index
      queries,
      chunkSize: 10000, // default: 1000
    }}
  )
}

export default search;
