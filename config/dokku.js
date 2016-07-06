const path = require('path');
const fs = require('fs');

module.exports = {
  host: '192.168.1.49',
  port: 22,
  username: 'dokku',
  privateKey: path.join(process.env.HOME, '.ssh/id_rsa'),
}
