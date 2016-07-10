const Bluebird = require('bluebird');
const parseColumns = require('parse-columns');

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

module.exports = {
  filterComments,
  getLinesArray,
  parseConfig,
  processOutput,
  parseColumns,
};
