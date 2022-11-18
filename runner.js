//--*----1----*----2----*----3----*----4----*----5----*----6----*----7----*----8
//                        Classification: UNCLASSIFIED
//==============================================================================
//                Copyright, Belford DBA Consulting, LLC, 2022
//                      Unpublished, All Rights Reserved
//==============================================================================
//--*----|----*----|----*----|----*----|----*----|----*----|----*----|----*----/
//
//--*----1----*----2----*----3----*----4----*----5----*----6----*----7----*----8
// NOTES: 
//------------------------------------------------------------------------------
// 
// nodejs.org/api 
// node --inspect-brk <prjctNm>
// 
// npm install chalk@4.1.2
// npm install jsdom
//
// npm run dev
// To stop: <CRTL>-C
//
// cls && date /T && time /T && tme
//
//--*----|----*----|----*----|----*----|----*----|----*----|----*----|----*----/

const chalk     = require('chalk');
const fs        = require('fs');
const path      = require('path');

const render    = require('./render');

const forbiddenDirs = ['node_modules'];

const prjctNm = "runner"
const debug   = 0;    // 0: Off   1: On
const err     = 0; 

if (debug > 0) {
    console.log(chalk.yellow('DEBUG:'), 'Hi there from ' + prjctNm + '!');

    if (err) {
        if (debug > 0) {
            console.log(chalk.red('ERROR:'), err);
            // throw new Error(err);
        };
    };
};

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (let file of this.testFiles) {
      console.log(chalk.gray('------------------------------------'));
      console.log(chalk.gray(file.shortName));
      const beforeEaches = [];

      global.render = render;

      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };

      global.it = (desc, fn) => {
        // console.log(chalk.yellow('DEBUG: runTests:'), desc);
        beforeEaches.forEach(func => func());
        try {
          fn();
          console.log(chalk.green('\t', 'OK:   '), desc);
        } catch (err) {
          // const message = err.message.replace(/\n\g, '\n\t\t')
          console.log(chalk.red('\t', 'ERROR:'), desc);
          console.log(chalk.red('\t\t', err.message));
        };
      };

      try {
        require(file.name);
      } catch (err) {
        console.log('\t\t', err);
      };
    };
  };

  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (let file of files) {
      const filepath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filepath);

      if (stats.isFile() && file.includes('.test.js')) {
        this.testFiles.push({ name: filepath, shortName: file});
      } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
        const childFiles = await fs.promises.readdir(filepath);

        files.push(...childFiles.map(f => path.join(file, f)));
      }
    };

    // return files;
  }
};

module.exports = Runner;

