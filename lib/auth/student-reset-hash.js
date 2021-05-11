const jwt = require('jsonwebtoken')
const hashSecret = process.env.HASH_SECRET;


module.exports = class ResetHash {

    static createToken(studentEmail) {
        return jwt.sign({
            studentEmail
        }, hashSecret, {
            expiresIn: '24h'
        });
    }

    static verifyToken(token) {
        const response = jwt.verify(token, hashSecret);
        return response
    }
}