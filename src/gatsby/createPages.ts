import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import chalk from 'chalk';
import { config } from '../../config';

require('gatsby-plugin-mdx/component-with-mdx-scope');

const log = console.log;

interface ICategory {
  fieldValue?: string;
}

interface INodeFrontMatter {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaDate?: string;
  tags?: string;
  img?: string;
}

interface INodeFields {
  slug?: string;
  id: number;
  title?: string;
  date?: string;
  tags?: string;
  img?: string;
}

export interface INode {
  fields?: INodeFields;
  ext?: string;
  relativePath?: string;
  body?: string;
  tableOfContents?: string;
  frontmatter?: INodeFrontMatter;
  name?: string;
}

interface IEdges {
  edges?: {
    node?: INode;
  }[];
}

interface IQueryResult {
  allMarkdownRemark?: IEdges;
  allMdx?: IEdges;
  tagsGroup: {
    group?: ICategory[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/BlogDocument.tsx`);
  const tagTemplate = path.resolve(`./src/templates/Tags.tsx`);

  const queryResult = await graphql<IQueryResult>(
    `{
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
            body
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
      },
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
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    const node = post?.node;
    const pagePath = node?.fields?.slug  || '/';

    if (!pagePath) {
      return log(chalk.yellow(`Warning: Blog post has no path. Skipping...`));
    }

    createPage({
      path: pagePath,
      component: blogPost,
      context: {
        id: node?.fields?.id,
        slug: pagePath,
        previous,
        next,
      },
    });
  });

  // Extract category data from query
  const tags = queryResult.data.tagsGroup?.group || [];

  if (tags.length === 0) {
    return log(
      chalk.yellow(
        `Warning: No categories were found in the blog. Skipping creating category pages.`,
      ),
    );
  }

  // Make category pages
  tags.forEach(tag => {
    createPage({
      path: `/визуализации/${kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  });
};

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
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

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  try {
    //if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent) as INode;

    if(parent) {
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
    }

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    const frontmatter: INodeFrontMatter = node.frontmatter;
    if(frontmatter) {
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
  } catch(e) {
    console.error(e);
    //throw e;
  }
};
