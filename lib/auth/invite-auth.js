const jwt = require('jsonwebtoken')
const hashSecret = process.env.HASH_SECRET;


module.exports = class InviteHash {

    static createToken(studentEmail, teacherEmail) {
        return jwt.sign({
            studentEmail,
            teacherEmail,
        }, hashSecret, {
            expiresIn: '24h'
        });
    }

    static verifyToken(token) {
        const response = jwt.verify(token, hashSecret);
        return response
    }
}