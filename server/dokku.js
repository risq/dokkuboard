const ssh = require('promised-ssh');
const Bluebird = require('bluebird');

const config = require('../config/dokku');

function getApps() {
  return getConn()
    .then(conn => conn.exec(['apps']))
    .then(getStdout)
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
    .then(conn => conn.exec([`apps:create ${appName}`]));
}

function deleteApp(appName) {
  return getConn()
    .then(conn => conn.exec([`apps:destroy ${appName} --force`]));
}

function getConfig(appName) {
  return getConn()
    .then(conn => conn.exec([`config ${appName}`]))
    .then(getStdout)
    .then(parseTable)
    .then(parseConfig);
}

function getUrl(appName) {
  return getConn()
    .then(conn => conn.exec([`url ${appName}`]))
    .then(getStdout);
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

function getStdout([stdout, stderr]) {
  return stdout || '';
}

function getConn() {
  return ssh
    .connect(config);
}

module.exports = {
  getApps,
  getApp,
  createApp,
  deleteApp,
};
