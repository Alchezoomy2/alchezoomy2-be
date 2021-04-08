
const teacherAuth = require('./teacher-auth.js');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.session;
    req.user = teacherAuth.verifyAuthToken(token);
    res.header('Access-Control-Allow-Origin', '*');
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

