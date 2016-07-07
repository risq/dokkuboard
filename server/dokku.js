const SSH = require('node-ssh');
const Bluebird = require('bluebird');
const parseColumns = require('parse-columns');

const dokkuConfig = Object.assign({}, require('../config/dokku'));
let connection;

function getApps() {
  return getConn()
    .then(conn => conn.execCommand('apps'))
    .then(processOutput)
    .then(filterComments)
    .then(getLinesArray);
}

function createApp(appName) {
  return getConn()
    .then(conn => conn.execCommand(`apps:create ${appName}`))
    .then(processOutput);
}

function deleteApp(appName) {
  return getConn()
    .then(conn => conn.execCommand(`apps:destroy ${appName} --force`))
    .then(processOutput);
}

function getConfig(appName) {
  return getConn()
    .then(conn => conn.execCommand(`config ${appName}`))
    .then(processOutput)
    .then(filterComments)
    .then(getLinesArray)
    .then(parseConfig);
}

function getUrl(appName) {
  return getConn()
    .then(conn => conn.execCommand(`url ${appName}`))
    .then(processOutput);
}

function getPs(appName) {
  return getConn()
    .then(conn => conn.execCommand(`ps ${appName}`))
    .then(processOutput)
    .then(filterComments)
    .then(parseColumns);
}

function getLogs(appName) {
  return getConn()
    .then(conn => conn.execCommand(`logs ${appName}`))
    .then(processOutput);
}

function filterComments(output) {
  return getLinesArray(output)
    .filter(res => res.length && res.indexOf('===') !== 0 && res.indexOf('---') !== 0)
    .join('\n');
}

function getLinesArray(output) {
  return output.split('\n');
}

function parseConfig(config) {
  return config.reduce((res, item) => {
    const parts = item.split(/:(.+)/);
    return Object.assign(res, { [parts[0]]: parts[1].trim() });
  }, {});
}

function processOutput({ stdout, stderr, code, signal }) {
  if (stderr || code !== 0) {
    return Bluebird.reject({ stdout, stderr, code, signal });
  }
  return stdout || '';
}

function getConn() {
  if (!connection) {
    console.log('Creating a new ssh connection...');
    connection = new SSH().connect(dokkuConfig);
  }
  return connection;
}

module.exports = {
  getApps,
  createApp,
  deleteApp,
  getUrl,
  getConfig,
  getPs,
  getLogs,
};
