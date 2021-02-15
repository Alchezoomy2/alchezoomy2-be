const jwt = require('jsonwebtoken')
const hashSecret = process.env.HASH_SECRET;


module.exports = class inviteHash {

    static createToken(studentEmail, teacherEmail) {
        return jwt.sign({
            invite: `${studentEmail}:${teacherEmail}`
        }, hashSecret, {
            expiresIn: '24h'
        });
    }

    static verifyToken(token) {
        const { invite } = jwt.verify(token, hashSecret);
        return invite
    }
}