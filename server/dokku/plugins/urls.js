const router = require('express').Router();

const { processOutput } = require('../utils');
const ssh = require('../ssh');

router.get('/:name', (req, res) =>
  get(req.params.name)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
);

function get(appName) {
  return ssh.getConn()
    .then(conn => conn.execCommand(`url ${appName}`))
    .then(processOutput);
}

module.exports = router;
