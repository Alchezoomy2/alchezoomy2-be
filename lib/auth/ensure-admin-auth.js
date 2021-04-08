const adminAuth = require('./admin-auth.js')

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.session;
        req.user = adminAuth.verifyAuthToken(token);
        next();
    } catch (err) {
        err.status = 401;
        next(err);
    }
};