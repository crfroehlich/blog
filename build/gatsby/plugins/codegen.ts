import { IPluginRefOptions } from 'gatsby';
import { addConfig } from '../../../config';

export interface PluginCodegenOptions {
  // Name of the generated apollo config file
  apolloConfigFile?: string;

  // apollo:codegen options configured for usage with gatsby, see defaultOptions
  addTypename?: boolean;
  excludes?: string[];
  includes?: string[];
  localSchemaFile?: string;
  output?: string;
  tsFileExtension?: string;
  watch?: boolean;
  tagName?: string;
  target?: 'typescript' | 'swift' | 'flow' | 'scala';

  // apollo:codegen additional options
  globalTypesFile?: string;
  mergeInFieldsFromFragmentSpreads?: boolean;
  namespace?: string;
  outputFlat?: boolean;
  passthroughCustomScalars?: boolean;
  useFlowExactObjects?: boolean;
  useReadOnlyTypes?: boolean;

  // Gatsby specific, not used in this plugin
  plugins?: unknown[];
}

const defaultOptions: IPluginRefOptions = {
  apolloConfigFile: 'apollo.config.js',
  addTypename: true,
  excludes: [],
  localSchemaFile: './schema.json',
  output: '__generated__',
  target: 'typescript',
  tagName: 'graphql',
  tsFileExtension: 'd.ts',
  includes: [
    './src/**/*.tsx',
    './src/**/*.ts',
    './build/**/*.js',
    './build/**/*.ts',
  ],
  // True can result in missed error messages through the console
  // Set it the following way to catch the errors during the build and still have watch mode:
  // process.env.NODE_ENV === "development" ? true : false
  watch: false,
};

export const addCodegen: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: 'gatsby-plugin-codegen',
    options: defaultOptions,
  });
};
