require('dotenv').config();
require('./lib/client').connect();
var https = require('https');
const fs = require('fs');
const app = require('./lib/app');
const path = require('path');

const PORT = process.env.PORT || 7890;

const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, '/cert/', 'privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, '/cert/', 'cert.pem'))
}, app)


app.listen(PORT, () => {
  console.log(`insecure server on ${PORT}`);
});

sslServer.listen(3443, () => console.log('secure server on port 3443'))
