const chalk     = require('chalk');
const jsdom     = require('jsdom');
const { resolve } = require('path');
const path      = require('path');

const { JSDOM } = jsdom;

const render = async filename => {
  const filePath = path.join(process.cwd(), filename);

  const dom = await JSDOM.fromFile(filePath, {
    runScripts: 'dangerously',
    resources:  'usable'
  });

  return new Promise((resolve, reject) => {
    dom.window.document.addEventListener('DOMContentLoaded', () => {
      // console.log(chalk.yellow('DEBUG: render: All done loading!'));
      resolve(dom);
    });
  });

  return dom;
};

module.exports = render;
