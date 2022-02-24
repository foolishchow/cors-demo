// @ts-check
const childProcess = require('child_process');
const { watchFile ,existsSync} = require('fs');
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
front.on('error',(e)=>{
  console.info(e.stack)
  server.kill()
  process.exit()
})
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
