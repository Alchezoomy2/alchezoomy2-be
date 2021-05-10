const jwt = require('jsonwebtoken');
const fetch = require('superagent');

const parseReturnedTeacherInfo = require('../utils/parseReturnedTeacherInfo.js')

const precodeAccessUrl = process.env.PRECODE_ACCESS_URL
const postcodeAccessUrl = process.env.POSTCODE_ACCESS_URL
const clientToken = process.env.CLIENT_TOKEN
const zoomUrl = process.env.ZOOM_URL
const appSecret = process.env.APP_SECRET

module.exports = class teacherAuth {

    static async authorize({ code }) {
        try {
            const accessTokenUrl = precodeAccessUrl + code + postcodeAccessUrl;
            let returnedObject = await fetch
                .post(accessTokenUrl)
                .set('Authorization', `Basic ${clientToken}`);

            const { access_token, refresh_token } = returnedObject.body;

            let returnedTeacherInfo = await fetch
                .get(zoomUrl + 'users/me')
                .set('Authorization', 'Bearer ' + access_token);

            console.log("🚀 ~ file: teacher-auth.js ~ line 26 ~ teacherAuth ~ authorize ~ returnedTeacherInfo", returnedTeacherInfo)

            const parsedTeacherInfo = await parseReturnedTeacherInfo(returnedTeacherInfo.body, access_token, refresh_token);
            console.log("🚀 ~ file: teacher-auth.js ~ line 28 ~ teacherAuth ~ authorize ~ parsedTeacherInfo", parsedTeacherInfo)

            return parsedTeacherInfo;
        } catch (err) {
            throw err;
        }
    }

    static authToken(teacher) {
        return jwt.sign({ teacher }, appSecret, {
            expiresIn: '24h'
        });
    }

    static verifyAuthToken(token) {
        const { teacher } = jwt.verify(token, appSecret);
        return teacher;
    }

};
