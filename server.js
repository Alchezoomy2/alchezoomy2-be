require('dotenv').config();
require('./lib/client').connect();
var https = require('https');
const fs = require('fs');
const app = require('./lib/app');
const path = require('path');


const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../../../etc/letsencrypt/live/api.alchemylectures.com', 'privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../../../etc/letsencrypt/live/api.alchemylectures.com', 'cert.pem'))
}, app)

const cert = fs.readFileSync(path.join(__dirname, '../../../etc/letsencrypt/live/api.alchemylectures.com', 'cert.pem'));
console.log(JSON.parse(cert))


console.log(sslServer)
sslServer.listen(3443, () => console.log('secure server on port 3443'))
