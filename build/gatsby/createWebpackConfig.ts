import { GatsbyNode } from 'gatsby';
import path from 'path';
import { RelativeCiAgentWebpackPlugin } from '@relative-ci/agent';
import { env } from '../initEnv';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions, stage }) => {
  const config = {
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
      },
      plugins: [],
    },
  };
  if (stage === 'build-javascript' && env.GATSBY_BUILD_MODE?.length) {
    config.resolve.plugins.push(new RelativeCiAgentWebpackPlugin());
  } else if (stage === 'develop' || stage === 'develop-html') {
    config.resolve.alias['react-dom'] = '@hot-loader/react-dom';
  }
  actions.setWebpackConfig(config);
};
