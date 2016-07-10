const express = require('express');

const apps = require('./dokku/plugins/apps.js');
const config = require('./dokku/plugins/config.js');
const logs = require('./dokku/plugins/logs.js');
const ps = require('./dokku/plugins/ps.js');
const urls = require('./dokku/plugins/urls.js');

module.exports = express.Router()
  .use('/apps', apps)
  .use('/config', config)
  .use('/logs', logs)
  .use('/ps', ps)
  .use('/urls', urls);
