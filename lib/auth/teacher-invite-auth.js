const jwt = require('jsonwebtoken')
const hashSecret = process.env.HASH_SECRET;


module.exports = class TeacherInviteHash {

    static createToken(teacherEmail) {
        return jwt.sign({
            teacherEmail
        }, hashSecret, {
            expiresIn: '24h'
        });
    }

    static verifyToken(token) {
        const response = jwt.verify(token, hashSecret);
        return response
    }
}