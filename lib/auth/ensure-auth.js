
const teacherAuth = require('../auth/teacher-auth.js');

module.exports = (req, res, next) => {
  try {
    console.log('///---------------------')
    console.log('cookie:')
    console.log(req.cookie)
    console.log('cookies:')
    console.log(req.cookies)
    console.log('///---------------------')

    const token = req.cookies.session;
    req.user = teacherAuth.verifyAuthToken(token);
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};