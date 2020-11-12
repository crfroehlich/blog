import { addConfig } from '../../../config';

export const addMdx: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 590,
            linkImagesToOriginal: true,
            sizeByPixelDensity: true,
          },
        },
        {
          resolve: 'gatsby-remark-responsive-iframe',
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        'gatsby-remark-copy-linked-files',
        'gatsby-remark-smartypants',
        'gatsby-remark-prismjs',
      ],
      extensions: ['.mdx', '.md'],
    },
  });
};
