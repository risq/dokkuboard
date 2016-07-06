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

function getApp(appName) {
  return Bluebird.props({
    name: appName,
    url: getUrl(appName),
    config: getConfig(appName),
  });
}

function createApp(appName) {
  return getConn()
    .then(conn => conn.execCommand(`apps:create ${appName}`));
}

function deleteApp(appName) {
  return getConn()
    .then(conn => conn.execCommand(`apps:destroy ${appName} --force`));
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
  if (stderr) {
    throw new Error(stderr);
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
  getApp,
  createApp,
  deleteApp,
};
