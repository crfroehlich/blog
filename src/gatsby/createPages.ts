import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import chalk from 'chalk';
import { config } from '../../config';
import { IQueryResult, INode } from '../types/interfaces';

require('gatsby-plugin-mdx/component-with-mdx-scope');

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const templates = {
    article: path.resolve('./src/templates/Article.tsx'),
    tag: path.resolve(`./src/templates/Tag.tsx`),
    визуализации: path.resolve('./src/templates/визуализации.tsx'),
  };

  const queryResult = await graphql<IQueryResult>(
    `
      query PagesCategoriesQuery {
        allMdx {
          edges {
            node {
              fields {
                id
                title
                slug
                date
                tags
                img
              }
              tableOfContents
              parent {
                ... on File {
                  relativePath
                }
              }
              frontmatter {
                metaTitle
                metaDescription
                metaDate
              }
            }
          }
        }
        tagsGroup: allMdx(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `,
  );

  if (queryResult.errors) {
    throw queryResult.errors;
  }

  if (!queryResult.data) {
    throw new Error('ERROR: Could not fetch posts on build');
  }

  // Create blog posts pages.
  const posts = queryResult?.data?.allMdx?.edges || [];

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : (posts[index + 1].node as INode);

    const next = index === 0 ? null : (posts[index - 1].node as INode);

    const node = post?.node;

    const pagePath = node?.fields?.slug || '/';

    if (!pagePath) {
      return console.info(chalk.yellow('Warning: Blog post has no path. Skipping...'));
    }

    createPage({
      path: pagePath,
      component: templates.article,
      context: {
        id: node?.fields?.id,
        slug: pagePath,
        previous,
        next,
      },
    });
  });

  createPage({
    path: `/визуализации/`,
    component: templates.визуализации,
    context: {},
  });

  // Extract category data from query
  const tags = queryResult.data.tagsGroup?.group || [];

  if (tags.length === 0) {
    return console.info(
      chalk.yellow(
        'Warning: No categories were found in the blog. Skipping creating category pages.',
      ),
    );
  }

  // Make category pages
  tags.forEach((node) => {
    createPage({
      path: `/тег/${kebabCase(node.fieldValue)}/`,
      component: templates.tag,
      context: {
        tag: node.fieldValue,
      },
    });
  });
};

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
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

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  try {

    const isContent =
      node.internal.type.toLowerCase().indexOf('mdx') !== -1 ||
      node.internal.type.toLowerCase().indexOf('markdown') !== -1;

    if (!isContent) return;

    const parent = getNode(node.parent) as INode;

    if (parent) {
      let value = parent.relativePath.replace(parent.ext, '');

      if (value === 'index') {
        value = '';
      }

      if (config.gatsby && config.gatsby.trailingSlash) {
        createNodeField({
          name: 'slug',
          node,
          value: value === '' ? '/' : `/${value}/`,
        });
      } else {
        createNodeField({
          name: 'slug',
          node,
          value: `/${value}`,
        });
      }
    }

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    const { frontmatter } = node as INode;

    if (frontmatter) {
      createNodeField({
        name: 'title',
        node,
        value: frontmatter?.title || startCase(parent?.name),
      });

      createNodeField({
        name: 'date',
        node,
        value: new Date(frontmatter?.metaDate),
      });

      createNodeField({
        name: 'tags',
        node,
        value: frontmatter?.tags?.toString().split(','),
      });

      const imagePath = frontmatter?.img || 'card.png';

      createNodeField({
        name: 'img',
        node,
        value: `${config.gatsby.cdnUrl}${imagePath}`,
      });
    }
  } catch (e) {
    console.error('Create node error', e);
  }
};
