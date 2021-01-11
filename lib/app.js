
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

var corsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

app.use('/api/v1/auth', require('./controllers/auth'));
app.use('/teacher', require('./controllers/teacher-routes.js'));
app.use('/student', require('./controllers/student-routes.js'));
app.use('/student/meetings', require('./controllers/student-meetings-routes.js'))
app.use('/student/bookmark', require('./controllers/student-bookmark-routes.js'))
app.use('/student/favorite', require('./controllers/student-favorite-routes.js'))

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'))


module.exports = app;

