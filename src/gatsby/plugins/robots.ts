import { addConfig } from '../../../config';

export const addRobots: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      policy: [{ userAgent: '*', allow: '/' }],
    },
  });
};
