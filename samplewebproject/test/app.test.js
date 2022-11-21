const chalk     = require('chalk');
const assert    = require('assert');

it('Has a test input', async () => {
  const dom = await render('index.html');

  // console.log(chalk.yellow('DEBUG: dom:'), dom);

  const input = dom.window.document.querySelector('input');

  assert(input);
});

it('Shows a succes message with a valid email address', async () => {
  // console.log(chalk.yellow('DEBUG:'), '');
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  input.value = 'test.email@gmail.com';
  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');

  // console.log(chalk.yellow('DEBUG: h1'), h1.innerHTML);

  assert.strictEqual(h1.innerHTML, 'Looks good!');
});

it('Shows a failure message with a invalid email address', async () => {
  // console.log(chalk.yellow('DEBUG:'), '');
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  input.value = 'test.email-gmail.com';
  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');

  // console.log(chalk.yellow('DEBUG: h1'), h1.innerHTML);

  assert.strictEqual(h1.innerHTML, 'Invalid email!');
});

//--------------------------------------
// TEST TEMPLATE
//--------------------------------------

it('Test template', async () => {
  // console.log(chalk.yellow('DEBUG:'), 'Test Template');
  
  const dom = await render('index.html');
  
});
