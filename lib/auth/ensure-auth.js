
const teacherAuth = require('../auth/teacher-auth.js');

module.exports = (req, res, next) => {
  try {
    console.log('cookies:')
    console.log(req.cookies)
    const token = req.cookies.session;
    req.user = teacherAuth.verifyAuthToken(token);
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};