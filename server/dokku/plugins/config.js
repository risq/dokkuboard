const router = require('express').Router();

const { processOutput, filterComments, getLinesArray, parseConfig } = require('../utils');
const ssh = require('../ssh');

router.get('/:name', (req, res) =>
  get(req.params.name)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
);

function get(appName) {
  return ssh.getConn()
    .then(conn => conn.execCommand(`config ${appName}`))
    .then(processOutput)
    .then(filterComments)
    .then(getLinesArray)
    .then(parseConfig);
}

module.exports = router;
