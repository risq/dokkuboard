const router = require('express').Router();

const { processOutput, filterComments, getLinesArray } = require('../utils');
const ssh = require('../ssh');

router.get('/', (req, res) =>
  get()
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
);

router.post('/', (req, res) =>
  create(req.body.name)
  .then(data => res.json(data))
  .catch(err => res.status(500).json(err))
);

router.delete('/:name', (req, res) =>
  destroy(req.params.name)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
);

function get() {
  return ssh.getConn()
    .then(conn => conn.execCommand('apps'))
    .then(processOutput)
    .then(filterComments)
    .then(getLinesArray);
}

function create(appName) {
  return ssh.getConn()
    .then(conn => conn.execCommand(`apps:create ${appName}`))
    .then(processOutput);
}

function destroy(appName) {
  return ssh.getConn()
    .then(conn => conn.execCommand(`apps:destroy ${appName} --force`))
    .then(processOutput);
}

module.exports = router;
