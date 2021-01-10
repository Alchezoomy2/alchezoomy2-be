const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = class teacherAuth {

    static async authorize({ teacherInfo, auth_token }) {
        try {
            const teacher = await Teacher.findById(teacherInfo.id);
            return teacher;
        } catch (err) {
            err.status = 401;
            throw err;
        }
    }

    static authToken(teacher) {
        return jwt.sign({ teacher: teacher.toJSON() }, process.env.APP_SECRET, {
            expiresIn: '24h'
        });
    }

    static verifyAuthOfToken(token) {
        const { teacher } = jwt.verify(token, process.env.APP_SECRET);
        return teacher;
    }

};
