import { GatsbyNode } from 'gatsby';
import path from 'path';
const { RelativeCiAgentWebpackPlugin } = require('@relative-ci/agent');

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
        'react-dom': '@hot-loader/react-dom',
      },
      plugins: [
        // ... other plugins
        new RelativeCiAgentWebpackPlugin({
          context: './src', // optional, will improve readability of the paths
          assets: true,
          entrypoints: true,
          chunks: true,
          modules: true
        })
      ],
    },
  });
};
