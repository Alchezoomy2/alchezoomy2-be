const studentAuth = require('./student-auth.js')

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.session;
        req.user = studentAuth.verifyAuthToken(token);
        next();
    } catch (err) {
        err.status = 401;
        next(err);
    }
};