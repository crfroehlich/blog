import { GatsbyNode } from 'gatsby';
import path from 'path';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions: {
    replaceWebpackConfig,
    setWebpackConfig,
  },
  getConfig,
  stage,
 }) => {
  const config = {
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
      }
    },
  };
  if (stage === 'develop' || stage === 'develop-html') {
    config.resolve.alias['react-dom'] = '@hot-loader/react-dom';
  }
  setWebpackConfig(config);

  const replaceConfig = getConfig();
  let options = {}

  if (stage === 'build-javascript') {
    replaceConfig.optimization.moduleIds = 'total-size'
    options = {
      name: `built-[1].[hash:6]`,
      regExp: '(\\w+).worker.(js|ts)$',
    }
  }

  replaceConfig.module.rules.push({
    test: /\.worker\.(js|ts)$/,
    use: { loader: 'workerize-loader', options },
  })

  replaceConfig.output.globalObject = 'this'

  replaceWebpackConfig(replaceConfig)
};
