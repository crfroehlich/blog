const glob = require('glob');
const {readFileSync, writeFileSync,lstatSync, readdirSync, existsSync } = require('fs');
const { join, resolve } = require('path');

const getAbsolutePath = (source, dirent) =>
  resolve(__dirname,  '../',source, dirent.name);

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

const getEntries = (source, parent) =>
    readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name !== parent.name)
      .map((dirent) => { return { name: dirent.name.split('.md')[0] } } );

const run = (source) => {
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .forEach((dirent) => {
      const fold = getAbsolutePath(source, dirent);
      
      let subs = getDirectories(fold);
      if(!subs.length) {
        
        subs = getEntries(fold, dirent);
        //return;
      }
      const content = 
`---
title: "${dirent.name}"
metaTitle: "${dirent.name}"
metaDate: 01/01/1990
metaDraft: false
---

${subs.map((s) => `- [${s.name}](${s.name})`).join('\r\n')}
`;
      writeFileSync(getAbsolutePath(source, dirent)+`/${dirent.name}.md`, content);
      run(`${source}\\${dirent.name}`);
    })
};



run('content');
console.log('done');