const SSH = require('node-ssh');
const Bluebird = require('bluebird');

const config = require('../config/dokku');

let connection;

function getApps() {
  return getConn()
    .then(conn => conn.execCommand('apps'))
    .then(processOutput)
    .then(parseTable);
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
    .then(parseTable)
    .then(parseConfig);
}

function getUrl(appName) {
  return getConn()
    .then(conn => conn.execCommand(`url ${appName}`))
    .then(processOutput);
}

function parseTable(table) {
  return table.split('\n')
    .filter(res => res.length && res.indexOf('===') !== 0);
}

function parseConfig(config) {
  return config.reduce((res, item) => {
    const parts = item.split(/:(.+)/);
    return Object.assign(res, { [parts[0]]: parts[1].trim() });
  }, {});
}

function processOutput({ stdout, stderr, code, signal }) {
  console.log({ stdout, stderr, code, signal });
  if (stderr || code !== 0) {
    return Bluebird.reject({ stdout, stderr, code, signal });
  }
  return stdout || '';
}

function getConn() {
  if (!connection) {
    console.log('Creating a new ssh connection...');
    connection = new SSH().connect(config);
  }
  return connection;
}

module.exports = {
  getApps,
  createApp,
  deleteApp,
  getUrl,
  getConfig,
};
