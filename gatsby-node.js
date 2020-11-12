import { loadEnv } from '@luddites-me/ts-tools';
import { getConfig } from './config';

const env = loadEnv();
getConfig(env);

export {
  createPages,
  onCreateNode,
  onCreateBabelConfig,
  onCreateWebpackConfig,
} from './src/gatsby/createPages';
