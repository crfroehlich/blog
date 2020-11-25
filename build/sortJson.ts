#!/usr/bin/env node
/*
  eslint-disable
    @typescript-eslint/no-explicit-any,
    no-param-reassign,
*/
import { readFileSync, writeFileSync } from 'fs';
import glob from 'glob';
import sortedJson from 'sorted-json'
import { Logger } from '../src/utils';

// Sort all the JSON files to improve readability and reduce conflicts
const defaultPath = '**/*.json';

type globCallback = (err: Error | null, matches: string[]) => void;

export interface GlobOptions {
  dot?: boolean;
  ignore?: string[];
  realPath?: boolean;
}

const GLOB_OPTIONS: GlobOptions = {
  dot: true,
  ignore: [
    '.cache/**',
    '.vscode/**',
    '.yarn/**',
    '**/test-data/**',
    'coverage/**',
    'dist/**',
    'node_modules/**',
    'nyc_output/**',
    'public/**',
    'tsconfig.json',
  ],
  realPath: true,
};

// Parse the package JSON for script and environment variable documentation
// eslint-disable-next-line complexity, sonarjs/cognitive-complexity
const parsePackageJson = (json: any): any => {
  // Sync the scripts with their docs
  if (json.scripts) {
    if (!json.scriptsDocumentation) {
      json.scriptsDocumentation = {};
    }
    // For each script, if no doc is defined, create it
    const scriptKeys = Object.keys(json.scripts);
    scriptKeys.forEach((key) => {
      if (!json.scriptsDocumentation[key]) {
        json.scriptsDocumentation[key] = {
          description: `Please document the <${key}> script.`,
          dev: true,
        };
      }
    });
    // If any doc exists for an undefined script, delete the doc
    const docKeys = Object.keys(json.scriptsDocumentation);
    docKeys.forEach((key) => {
      if (!json.scripts[key]) {
        delete json.scriptsDocumentation[key];
      }
    });
  }
  // Sync the environment variables
  if (!json.envDocumentation) {
    json.envDocumentation = {};
  }
  // For each environment variable, if no doc exists, create it
  const definedEnvKeys = readFileSync('.env.schema')
    .toString()
    .replace(/=/g, '')
    .split('\n')
    .filter(Boolean);
  definedEnvKeys.forEach((key) => {
    if (!json.envDocumentation[key]) {
      json.envDocumentation[key] = {
        description: `Please document the <${key}> variable`,
      };
    }
  });
  // For each doc, if no env exists, delete the doc
  const envDocKeys = Object.keys(json.envDocumentation);
  envDocKeys.forEach((key) => {
    if (!definedEnvKeys.find((k) => k === key)) {
      delete json.envDocumentation[key];
    }
  });
  return json;
};

const defaultCallback = (er: Error | null, files: string[]): void => {
  if (er) {
    Logger.error('File parsing failed', er);
  }
  files.forEach((fileName) => {
    try {

      const file = readFileSync(fileName, 'utf-8');
      let json: any;
      try {
        json = JSON.parse(file);
      } catch (e) {
        Logger.info(`Skipped ${fileName}.`);
        return;
      }
      if (fileName === 'package.json') {
        parsePackageJson(json);
      }

      const sorted = sortedJson.sortify(json);
      const stringified = JSON.stringify(sorted, null, 2).concat('\n');
      writeFileSync(fileName, stringified);
      Logger.info(`Alpha-sorted ${fileName} JSON file`);
    } catch (err) {
      Logger.error(`Error: parsing ${fileName}.`, err);
    }
  });
};

/**
 * Iterates over all JSON files and alpha sorts them
 * @remarks
 * This excludes files not in VCS
 * @public
 */
export const sortJson = (
  path: string = defaultPath,
  options: GlobOptions = GLOB_OPTIONS,
  callback: globCallback = defaultCallback,
): void => {
  glob(path, options, callback);
};

sortJson();
