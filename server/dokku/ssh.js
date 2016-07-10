const SSH = require('node-ssh');
const dokkuConfig = Object.assign({}, require('../../config/dokku'));

let connection;

function getConn() {
  if (!connection) {
    console.log('Creating a new ssh connection...');
    connection = new SSH().connect(dokkuConfig);
  }
  return connection;
}

module.exports = {
  getConn,
};
