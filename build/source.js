const glob = require('glob');
const { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } = require('fs');
const path = require('path');

const GLOB_OPTIONS = {
  dot: true,
  ignore: [
    '.circleci/**',
    '.vscode/**',
    'coverage/**',
    'dist/**',
    'node_modules/**',
    'nyc_output/**',
    'tsconfig.json',
    '**/test-data/**',
    'index.ts',
  ],
  realPath: true,
};

const getFullPath = (fileName) => `${__dirname}/../${fileName}`;

const makeDirectories = (fileName) => {
  // -- create folders all the way down
  const folders = fileName.split('/').slice(0, -1);  // remove last item, file
  folders.reduce(
    (acc, folder) => {
      const folderPath = `${acc}${folder}/`;
      if (!existsSync(getFullPath(folderPath))) {
        mkdirSync(getFullPath(folderPath));
      }
      return folderPath;
    },
    '/', // first 'acc', important
  );
};

const getFileStats = (fileName) => statSync(getFullPath(fileName));

const cleanup = (er, files) => {
  files
    .filter((f) => f.indexOf('.') > -1)
    .forEach((fileName) => {
      if (fileName.indexOf('index.ts') > -1) return;
      const src = readFileSync(fileName, 'utf-8');
      const pathSegments = fileName.split('/');
      const nameSegments = pathSegments[pathSegments.length - 1].split('.');
      const language = nameSegments[nameSegments.length - 1];
      const output =
`---
created: ${getFileStats(fileName).birthtime.toLocaleDateString()}
updated: ${getFileStats(fileName).mtime.toLocaleDateString()}
github: https://github.com/crfroehlich/blog/blob/main/${pathSegments.join('/')}
labels:
  - ${language}
  - ${pathSegments.slice(0, pathSegments.length - 1).join('\n  - ')}
title: '${nameSegments[0]}'
---

## ${fileName}

\`\`\`${language}
${src}\`\`\`
`;
      makeDirectories(`content/${fileName}`);
      writeFileSync(`content/${fileName.split('.')[0]}.md`, output);
    });
};

glob('src/**/**', GLOB_OPTIONS, cleanup);
