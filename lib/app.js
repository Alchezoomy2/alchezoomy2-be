const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
    sameSite: 'none',
}

app.use(cors(corsOptions));
app.use(require('cookie-parser')());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

app.use('/deauthorize', require('./controllers/deauthorize'))

app.use('/teacher', require('./controllers/teacher-routes.js'));
app.use('/teacher/subscriptions', require('./controllers/teacher-subscription-routes'));
app.use('/teacher/meetings', require('./controllers/teacher-meetings-routes'))

app.use('/student', require('./controllers/student-routes.js'));
app.use('/student/meetings', require('./controllers/student-meetings-routes.js'))
app.use('/student/bookmark', require('./controllers/student-bookmark-routes.js'))
app.use('/student/favorite', require('./controllers/student-favorite-routes.js'))

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'))


module.exports = app;

