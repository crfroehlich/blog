const glob = require('glob');
const readline = require('readline');
const {readFileSync, writeFileSync } = require('fs');

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
  
  glob('**/*.md', GLOB_OPTIONS, (er, files) => {

    let stop = 0;

    files.forEach((fileName) => {
        stop += 1;
        //if(stop > 3) return;

        const md = readFileSync(fileName, 'utf-8');
        const lines = md.split('\r\n');
        if(lines[0].startsWith('---')) {
            let i = 1;
            let nextLine = lines[i];
            
            while(nextLine && !nextLine.startsWith('---')) {
                const parts = nextLine.split(': ');
                if(parts[0].startsWith('aliases')) {

                }
                else if(parts[0].startsWith('tags')) {
                    parts[0] = parts[0].trim();
                    let tags = '["' + parts[1].toString().slice(1,-1).split(', ').join('","') + '"]'.replace('""', '"');
                    parts[1] = tags;
                } else {
                    if(parts[0].trim() === 'date') {
                        parts[0] = 'metaDate';
                        parts[1] = new Date(parts[1]).toLocaleDateString();
                    }
                    else if(parts[1].startsWith('"') && parts[1].endsWith('"')) {
                        //nada
                    }
                    else if(parts[1].startsWith("'") && parts[1].endsWith("'")) {
                        parts[1] = '"' + parts[1].slice(1,-1) + '"';
                    }
                    
                    if(parts[0].trim() === 'title') {
                        parts[1] += '\r\nmetaTitle: ' + parts[1];
                    }
                    if(parts[0].trim() === 'description') {
                        parts[0] = 'metaDescription';
                    }
                    if(parts[0].trim() === 'draft') {
                        parts[0] = 'metaDraft';
                    }
                }

                lines[i] = parts.join(': ');
                i += 1;
                nextLine = lines[i];
            }
            writeFileSync(fileName, lines.join('\n'));
        } 
        
    });

  });
