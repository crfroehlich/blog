import { env } from './build/initEnv';
import { getConfig } from './config';

getConfig(env);

export {
  createPages,
  createSchemaCustomization,
  onCreateNode,
  onCreateWebpackConfig,
} from './build/gatsby';

