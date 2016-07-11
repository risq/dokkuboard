const expressWs = require('express-ws');
const pty = require('pty.js');

const dokkuConfig = require('../config/dokku');

function getCommand(dokkuCommand) {
  const args = [
    '-t',
    `-i ${dokkuConfig.privateKey}`,
    `${dokkuConfig.username}@${dokkuConfig.host}`,
    `-p ${dokkuConfig.port}`,
    '--',
    dokkuCommand,
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

function initShell(dokkuCommand, ws) {
  let connState = 0;

  console.log(`Creating new shell with command "${dokkuCommand}"`);
  const term = pty.spawn('bash', [], {
    name: dokkuCommand,
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
    console.log(`Closing existing shell for command "${dokkuCommand}"`);
    term.write('exit\n');
    term.end();
    delayKillProcess(term.pid);
  });

  term.write(getCommand(dokkuCommand));
}

module.exports = {
  init(app) {
    expressWs(app);

    app.ws('/shell/enter', (ws, req, next) => {
      if (req.query.appName) {
        initShell(`enter ${req.query.appName}`, ws);
      }
      next();
    });

    app.ws('/shell/logs', (ws, req, next) => {
      if (req.query.appName) {
        initShell(`logs ${req.query.appName} -t`, ws);
      }
      next();
    });
  },
};
