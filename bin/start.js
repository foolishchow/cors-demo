// @ts-check
const childProcess = require('child_process');
const { watchFile } = require('fs');
const { resolve } = require('path');
let server = childProcess.fork('./server/index.js', {
  stdio: 'inherit',
});
const front = childProcess.spawn(
  resolve(__dirname, '../node_modules/.bin/anywhere'),
  ['-s'],
  {
    stdio: 'inherit',
    cwd: resolve(__dirname, '../website'),
  }
);

watchFile('./server/index.js', () => {
  server.kill();
  server = childProcess.fork('./server/index.js', {
    stdio: 'inherit',
  });
});

process.on('beforeExit', () => {
  server.kill();
  front.kill();
});
