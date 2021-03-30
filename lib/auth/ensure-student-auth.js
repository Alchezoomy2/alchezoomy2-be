const studentAuth = require('./student-auth.js')

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.session;
        console.log("🚀 ~ file: ensure-student-auth.js ~ line 6 ~ token", token)

        req.user = studentAuth.verifyAuthToken(token);
        next();
    } catch (err) {
        err.status = 401;
        next(err);
    }
};