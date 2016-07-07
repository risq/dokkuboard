const expressWs = require('express-ws');
const pty = require('pty.js');

module.exports = {
  init(app) {
    expressWs(app);

    app.ws('/shell', (ws, req, next) => {
      if (req.query.appName) {
        console.log(`Creating new shell for app ${req.query.appName}`);
        const term = pty.spawn('ssh',
          ['-t', 'dokku@192.168.0.210', '--', `enter ${req.query.appName}`], {
            name: 'xterm-color',
            cols: 80,
            rows: 24,
            cwd: process.env.PWD,
            env: process.env,
          });

        term.on('data', data => {
          try {
            ws.send(data);
          } catch (err) {
            console.log(err);
          }
        });
        ws.on('message', msg => term.write(msg));
        ws.on('close', () => {
          console.log('Closing shell connection - killing PID', term.pid);
          term.write('exit\n');
          setTimeout(() => process.kill(term.pid), 10000);
        });
      }
      next();
    });
  },
};
