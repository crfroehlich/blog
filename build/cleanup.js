const glob = require('glob');
const { readFileSync, writeFileSync } = require('fs');
const matter = require('gray-matter');
const sortedJson = require('sorted-json');

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
  ],
  realPath: true,
};

const cleanup = (er, files) => {
  files.forEach((fileName) => {
    const md = readFileSync(fileName, 'utf-8');

    const firstFourLines = (file) => {
      let excerpt = '';
      let i = 0;
      const content = file.content.split('\n');
      while (excerpt.length < 10) {
        excerpt += content[i].trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
        i += 1;
      }
      file.excerpt = `${excerpt.trim().slice(0, 100)}...`;
    };

    const grey = matter(md, { excerpt: firstFourLines });
    const frontmatter = grey.data;
    if (frontmatter.metaDescription) {
      delete frontmatter.metaDescription;
    }
    frontmatter.description = grey.excerpt;
    if (frontmatter.metaTitle) {
      if (!frontmatter.title) {
        frontmatter.title = frontmatter.metaTitle;
      }
      delete frontmatter.metaTitle;
    }
    if (!frontmatter.tags || frontmatter.tags.length === 0) {
      frontmatter.tags = ['void'];
    }
    if (frontmatter.metaDate) {
      frontmatter.date = frontmatter.metaDate;
      delete frontmatter.metaDate;
    }
    if (!frontmatter.date) {
      frontmatter.date = new Date().toLocaleDateString();
    }
    if (frontmatter.draft !== false || fileName.endsWith('.bak')) {
      frontmatter.draft = true;
    }
    const subtitle = frontmatter.title.split(':')[1];
    if (subtitle) {
      frontmatter.subtitle = subtitle;
    }
    if (frontmatter.aliases) {
      delete frontmatter.aliases;
    }
    if (frontmatter.img) {
      frontmatter.background = `../../assets/images/${frontmatter.img}`;
      delete frontmatter.img;
    }
    const output = matter.stringify(grey.content, sortedJson.sortify(frontmatter));
    writeFileSync(fileName, output);
  });
};

glob('content/**/*.md', GLOB_OPTIONS, cleanup);
glob('content/**/*.mdx', GLOB_OPTIONS, cleanup);
//glob('content/**/*.bak', GLOB_OPTIONS, cleanup);
