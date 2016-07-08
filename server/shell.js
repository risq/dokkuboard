const expressWs = require('express-ws');
const pty = require('pty.js');

const dokkuConfig = require('../config/dokku');

function getCommand(appName) {
  const args = [
    '-t',
    `-i ${dokkuConfig.privateKey}`,
    `${dokkuConfig.username}@${dokkuConfig.host}`,
    `-p ${dokkuConfig.port}`,
    '--',
    `enter ${appName}`,
  ];

  return `ssh ${args.join(' ')} #\n`;
}

function delayKillProcess(pid, delay = 10000) {
  return setTimeout(() => {
    try {
      console.log(`Killing process ${pid}`);
      process.kill(pid);
    } catch (err) {
      console.log(err);
    }
  }, delay);
}

function initShell(appName, ws) {
  let connState = 0;

  console.log(`Creating new shell for app ${appName}`);
  const term = pty.spawn('bash', [], {
    name: `${appName}-container`,
    cols: 80,
    rows: 24,
    cwd: process.env.PWD,
    env: process.env,
  });

  term.on('data', data => {
    if (connState > 1) {
      if (ws.readyState === ws.OPEN) {
        ws.send(data);
      }
    } else if (/#/.exec(data)) {
      connState++;
    }
  });
  ws.on('message', message => term.write(message));
  ws.on('close', () => {
    console.log(`Closing existing shell for app ${appName}`);
    term.write('exit\n');
    term.end();
    delayKillProcess(term.pid);
  });

  term.write(getCommand(appName));
}

module.exports = {
  init(app) {
    expressWs(app);

    app.ws('/shell', (ws, req, next) => {
      if (req.query.appName) {
        initShell(req.query.appName, ws);
      }
      next();
    });
  },
};
