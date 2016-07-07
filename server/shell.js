const expressWs = require('express-ws');
const pty = require('pty.js');

const dokkuConfig = require('../config/dokku');

module.exports = {
  init(app) {
    expressWs(app);

    app.ws('/shell', (ws, req, next) => {
      if (req.query.appName) {
        console.log(`Creating new shell for app ${req.query.appName}`);
        const args = [
          '-t',
          `-i ${dokkuConfig.privateKey}`,
          `${dokkuConfig.username}@${dokkuConfig.host}`,
          `-p ${dokkuConfig.port}`,
          '--',
          `enter ${req.query.appName}`,
        ];
        console.log(`command: ssh ${args.join(' ')}`);
        const term = pty.spawn('ssh', args, {
          name: `${req.query.appName}-container`,
          cols: 80,
          rows: 24,
          cwd: process.env.PWD,
          env: process.env,
        });

        term.on('data', data => {
          if (ws.readyState === ws.OPEN) {
            ws.send(data);
          } else {
            console.log('connection closed');
          }
        });
        ws.on('message', msg => term.write(msg));
        ws.on('close', () => {
          console.log('Closing shell connection - killing PID', term.pid);
          term.write('exit\n');
          setTimeout(() => {
            try {
              process.kill(term.pid);
            } catch (err) {
              console.log(err);
            }
          }, 10000);
        });
      }
      next();
    });
  },
};
