const jwt = require('jsonwebtoken');
const appSecret = process.env.APP_SECRET


module.exports = class adminAuth {
    static authToken(admin) {
        return jwt.sign({ admin: admin }, appSecret, { expiresIn: '24h' })
    }

    static verifyAuthToken(token) {
        const { admin } = jwt.verify(token, appSecret);
        return admin
    }
}
