const router = require('express').Router();

const { processOutput, filterComments, parseColumns } = require('../utils');
const ssh = require('../ssh');

router.get('/:name', (req, res) =>
  get(req.params.name)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
);

function get(appName) {
  return ssh.getConn()
    .then(conn => conn.execCommand(`ps ${appName}`))
    .then(processOutput)
    .then(filterComments)
    .then(parseColumns);
}

module.exports = router;
