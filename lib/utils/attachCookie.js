const teacherAuth = require('../auth/teacher-auth.js');

module.exports = (res, user) => {

    res.cookie('session', teacherAuth.authToken(user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: true,
    });
};