
const teacherAuth = require('./teacher-auth.js');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.session;
    console.log(token)
    req.user = teacherAuth.verifyAuthToken(token);
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

