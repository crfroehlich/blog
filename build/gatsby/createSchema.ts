import { GatsbyNode } from 'gatsby';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions,
}): Promise<void> => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      background: [File!]!
    }
  `;
  return createTypes(typeDefs);
};
