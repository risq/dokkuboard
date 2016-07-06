const path = require('path');
const fs = require('fs');

module.exports = {
  host: '192.168.0.210',
  port: 22,
  username: 'dokku',
  privateKey: fs.readFileSync(path.join(process.env.HOME, '.ssh/id_rsa')),
}
