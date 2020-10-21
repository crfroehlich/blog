const componentWithMDXScope = require('gatsby-plugin-mdx/component-with-mdx-scope');

const path = require('path');

const startCase = require('lodash.startcase');

const config = require('./config');
const _ = require('lodash');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  fields {
                    id
                  }
                  tableOfContents
                  fields {
                    slug
                  }
                }
              }
            },
            tagsGroup: allMdx(limit: 2000) {
              group(field: frontmatter___tags) {
                fieldValue
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors); // eslint-disable-line no-console
          reject(result.errors);
        }

        const blogTemplate = path.resolve('./src/templates/docs.js');
        const tagTemplate = path.resolve("src/templates/tags.js")

        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug ? node.fields.slug : '/',
            component: blogTemplate,
            context: {
              id: node.fields.id,
            },
          });
        });

        // Make tag pages
        result.data.tagsGroup.group.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
            component: tagTemplate,
            context: {
              tag: tag.fieldValue,
            },
          })
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
      },
    },
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from',
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);

    let value = parent.relativePath.replace(parent.ext, '');

    if (value === 'index') {
      value = '';
    }

    if (config.gatsby && config.gatsby.trailingSlash) {
      createNodeField({
        name: `slug`,
        node,
        value: value === '' ? `/` : `/${value}/`,
      });
    } else {
      createNodeField({
        name: `slug`,
        node,
        value: `/${value}`,
      });
    }

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title || startCase(parent.name),
    });

    createNodeField({
      name: 'date',
      node,
      value: new Date(node.frontmatter.metaDate),
    });
  }
};
