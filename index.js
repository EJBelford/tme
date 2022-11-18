#!/usr/bin/env node

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
// npm install express
// npm install nodemon
//
// npm run dev
// To stop: <CRTL>-C
//
// cls && date /T && time /T && tme
//
//--*----|----*----|----*----|----*----|----*----|----*----|----*----|----*----/

const chalk     = require('chalk');

const Runner    = require('./runner');

const runner = new Runner();

const prjctNm = "tme"
const debug   = 1;    // 0: Off   1: On
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

console.log(chalk.yellow('DEBUG:'), 'Running test!!...');

//--+----1----+----2----+----3----+----4----+----5----+----6----+----7----+----8

//--------------------------------------
// FILE COLLECTION
//--------------------------------------

// Find all files ending in '*.test.js' recursively through a folder

const run = async () => { 
  // Store a reference to each file we find
  await runner.collectFiles(process.cwd());
  console.log(chalk.yellow('DEBUG: testFiles'), runner.testFiles);

  // Execute each of the test files ono by one
  runner.runTests();

};

run();







