import { GatsbyNode } from 'gatsby';
import { startCase } from 'lodash';
import Logger from '../utils/Logger';
import { INode } from '..';
import { getConfig } from '../../config';

const config = getConfig();

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

    if (frontmatter) {
      const execInScope = (func) => func();

      execInScope(() => {
        let tags;
        if (Array.isArray(frontmatter.tags)) {
          tags = frontmatter.tags;
        }
        if (tags) {
          createNodeField({
            name: 'tags',
            node,
            value: tags,
          });
        }
      });

      execInScope(() => {
        let date = new Date(frontmatter.date);
        if (Number.isNaN(date?.getTime())) {
          date = undefined;
        }

        createNodeField({
          name: 'date',
          node,
          value: date,
        });

        const year = date?.getFullYear();

        createNodeField({
          name: 'year',
          node,
          value: year,
        });
      });

      createNodeField({
        name: 'title',
        node,
        value: frontmatter.title || startCase(parent?.name),
      });

      if (frontmatter.description) {
        createNodeField({
          name: 'description',
          node,
          value: frontmatter.description,
        });
      }

      if (frontmatter.subtitle) {
        createNodeField({
          name: 'subtitle',
          node,
          value: frontmatter.subtitle,
        });
      }
      if (frontmatter.img) {
        createNodeField({
          name: 'img',
          node,
          value: `${config.gatsby.cdnUrl}${frontmatter.img}`,
        });
      }

      execInScope(() => {
        let labels;
        if (Array.isArray(frontmatter.labels)) {
          labels = frontmatter.labels;
        }
        if (labels) {
          createNodeField({
            name: 'labels',
            node,
            value: labels,
          });
        }
      });

      execInScope(() => {
        let created = new Date(frontmatter.created);
        if (Number.isNaN(created?.getTime())) {
          created = undefined;
        }
        if (created) {
          createNodeField({
            name: 'created',
            node,
            value: created,
          });
        }
      });

      execInScope(() => {
        let updated = new Date(frontmatter.updated);
        if (Number.isNaN(updated?.getTime())) {
          updated = undefined;
        }
        if (updated) {
          createNodeField({
            name: 'updated',
            node,
            value: updated,
          });
        }
      });
      if (frontmatter.github) {
        createNodeField({
          name: 'github',
          node,
          value: frontmatter.github,
        });
      }
    }
  } catch (e) {
    Logger.error(['Create node error', e]);
  }
};
