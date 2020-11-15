import { loadEnv } from '@luddites-me/ts-tools';
import { getConfig } from './config';

const env = loadEnv();
getConfig(env);

export { createPages, onCreateNode, onCreateWebpackConfig } from './src/gatsby';
