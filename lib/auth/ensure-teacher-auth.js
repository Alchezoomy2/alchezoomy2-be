
const teacherAuth = require('./teacher-auth.js');

module.exports = (req, res, next) => {
  console.log('teacherAUth')
  try {
    const token = req.cookies.session;
    req.user = teacherAuth.verifyAuthToken(token);
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

