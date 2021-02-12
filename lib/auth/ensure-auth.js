
const teacherAuth = require('../auth/teacher-auth.js');
const studentAuth = require()

export const ensureTeacherAuth = (req, res, next) => {
  try {
    const token = req.cookies.session;
    req.user = teacherAuth.verifyAuthToken(token);
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

export const ensureStudentAuth = (req, res, next) => {
  try {
    const token = req.cookies.session;
    req.user = studentAuth.verifyAuthToken(token);
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
