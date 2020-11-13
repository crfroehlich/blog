import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import { getConfig } from '../../config';
import { IQueryResult, INode } from '../types/interfaces';
import Logger from '../utils/logger';

require('@hot-loader/react-dom');
require('gatsby-plugin-mdx/component-with-mdx-scope');

const config = getConfig();

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
        allPages: allMdx {
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
                title
                subtitle
                date
                tags
                img
              }
            }
          }
        }
        tagsGroup: allMdx(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
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
  const posts = queryResult?.data?.allPages?.edges || [];

  // Extract category data from query
  const tags = queryResult.data.tagsGroup?.group || [];

  posts.forEach((post, index) => {
    const prevNode = index === posts.length - 1 ? posts[0].node : posts[index + 1].node;
    const previous = prevNode as INode;

    const nextNode = index === 0 ? posts[posts.length - 1].node : posts[index - 1].node;
    const next = nextNode as INode;

    const node = post?.node;

    const pagePath = node?.fields?.slug || '/';

    const nodeTags = node?.fields?.tags || [];
    const pageTags = [];
    nodeTags.forEach((t) => {
      const grp = tags.find((g) => g.fieldValue === t);
      pageTags.push({
        name: grp?.fieldValue,
        count: grp?.totalCount,
      });
    });

    if (!pagePath) {
      return Logger.info('Warning: Blog post has no path. Skipping...');
    }

    createPage({
      path: pagePath,
      component: templates.article,
      context: {
        id: node?.fields?.id,
        slug: pagePath,
        previous,
        next,
        pageTags,
        toc: {
          type: 'Article',
          content: node?.tableOfContents?.items?.map((item) => {
            return {
              id: `#${item.title?.replace(/\s+/g, '').toLowerCase()}`,
              name: item.title,
            };
          }),
        },
        title: node?.fields?.title,
      },
    });
  });

  createPage({
    path: `/визуализации/`,
    component: templates.визуализации,
    context: {
      toc: {
        type: 'Visualization',
        content: [],
      },
      title: 'Visualizations',
    },
  });

  if (tags.length === 0) {
    return Logger.info(
      'Warning: No categories were found in the blog. Skipping creating category pages.',
    );
  }

  const tagToc = {
    type: 'Tag',
    content: tags
      .filter((tag) => tag.totalCount > 2)
      .sort((a, b) => b.totalCount - a.totalCount)
      .map((tag) => {
        return { id: `/тег/${tag.fieldValue}`, name: `${tag.fieldValue} (${tag.totalCount})` };
      }),
  };

  // Make category pages
  tags.forEach((node) => {
    createPage({
      path: `/тег/${kebabCase(node.fieldValue)}/`,
      component: templates.tag,
      context: {
        tag: node.fieldValue,
        toc: tagToc,
        title: node.fieldValue,
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
        'react-dom': '@hot-loader/react-dom',
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
    const { frontmatter } = node as INode;

    if (frontmatter.draft === true) return;

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

    let tags = [];
    if (Array.isArray(frontmatter.tags)) {
      tags = frontmatter.tags;
    } else {
      tags = frontmatter?.tags?.toString().split(',');
    }

    let date = new Date(frontmatter?.date);
    if (Number.isNaN(date.getTime())) {
      date = new Date();
    }
    const year = date.getFullYear();

    if (frontmatter) {
      createNodeField({
        name: 'title',
        node,
        value: frontmatter?.title || startCase(parent?.name),
      });

      createNodeField({
        name: 'date',
        node,
        value: date,
      });

      createNodeField({
        name: 'year',
        node,
        value: year,
      });

      createNodeField({
        name: 'description',
        node,
        value: frontmatter?.description,
      });

      createNodeField({
        name: 'subtitle',
        node,
        value: frontmatter?.subtitle,
      });

      createNodeField({
        name: 'tags',
        node,
        value: tags,
      });

      const imagePath = frontmatter?.img || 'card.png';

      createNodeField({
        name: 'img',
        node,
        value: `${config.gatsby.cdnUrl}${imagePath}`,
      });
    }
  } catch (e) {
    Logger.error('Create node error', e);
  }
};
