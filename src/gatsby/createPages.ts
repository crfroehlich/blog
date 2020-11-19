import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import kebabCase from 'lodash/kebabCase';
import { IQueryResult, INode } from '../types/interfaces';
import Logger from '../utils/Logger';

require('@hot-loader/react-dom');
require('gatsby-plugin-mdx/component-with-mdx-scope');

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const templates = {
    article: path.resolve('./src/templates/Article.tsx'),
    label: path.resolve('./src/templates/Label.tsx'),
    source: path.resolve('./src/templates/Source.tsx'),
    tag: path.resolve(`./src/templates/Tag.tsx`),
    визуализации: path.resolve('./src/templates/визуализации.tsx'),
  };

  const queryResult = await graphql<IQueryResult>(
    `
      query PagesCategoriesQuery {
        allPages: allMdx(filter: { fileAbsolutePath: { glob: "**/content/posts/**" } }) {
          edges {
            node {
              fields {
                id
                title
                slug
                date
                tags
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
                background {
                  childImageSharp {
                    fixed(width: 200) {
                      base64
                      aspectRatio
                      width
                      height
                      src
                      srcSet
                    }
                  }
                }
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
        allSrc: allMdx(filter: { fileAbsolutePath: { glob: "**/content/src/**" } }) {
          edges {
            node {
              fields {
                id
                title
                slug
                created
                updated
                github
                labels
              }
              parent {
                ... on File {
                  relativePath
                }
              }
              frontmatter {
                title
                github
                created
                updated
                labels
              }
            }
          }
        }
        labelsGroup: allMdx(limit: 2000) {
          group(field: frontmatter___labels) {
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
  const articles = queryResult?.data?.allPages?.edges || [];

  // Extract tag data from query
  const tags = queryResult?.data?.tagsGroup?.group || [];

  articles.forEach((post, index) => {
    const prevNode = index === articles.length - 1 ? articles[0].node : articles[index + 1].node;
    const previous = prevNode as INode;

    const nextNode = index === 0 ? articles[articles.length - 1].node : articles[index - 1].node;
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
        id: node.fields.id,
        slug: pagePath,
        previous,
        next,
        pageTags,
        background: node.frontmatter.background,
        toc: {
          type: 'Article',
          content: node.tableOfContents?.items?.map((item) => {
            return {
              id: `#${item.title?.replace(/\s+/g, '').toLowerCase()}`,
              name: item.title,
            };
          }),
        },
        title: node?.fields?.title,
        type: 'Article',
      },
    });
  });

  // Create source code pages
  const source = queryResult?.data?.allSrc?.edges || [];

  // Extract tag data from query
  const labels = queryResult.data.labelsGroup?.group || [];

  source.forEach((src) => {
    const node = src?.node;

    const pagePath = node?.fields?.slug;

    const nodeLabels = node?.fields?.labels || [];
    const pageLabels = [];
    nodeLabels.forEach((t) => {
      const grp = labels.find((g) => g.fieldValue === t);
      pageLabels.push({
        name: grp?.fieldValue,
        count: grp?.totalCount,
      });
    });

    if (!pagePath) {
      return Logger.info('Warning: Source code has no path. Skipping...');
    }

    createPage({
      path: pagePath,
      component: templates.source,
      context: {
        id: node?.fields?.id,
        slug: pagePath,
        pageLabels,
        type: 'Source',
        title: node?.fields?.title,
      },
    });
  });

  // Create visualizations page
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
      'Warning: No categories were found in the blog. Skipping creating тег pages.',
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

  if (labels.length === 0) {
    return Logger.info(
      'Warning: No labels were found in the source code. Skipping creating этикетка pages.',
    );
  }

  // Make category pages
  labels.forEach((node) => {
    createPage({
      path: `/этикетка/${kebabCase(node.fieldValue)}/`,
      component: templates.label,
      context: {
        label: node.fieldValue,
        title: node.fieldValue,
      },
    });
  });
};
